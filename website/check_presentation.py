"""Presentation checks: chapter states, script cues, layout and navigation.
Run with the repository served on http://127.0.0.1:8766/.
"""
from pathlib import Path
import re
from playwright.sync_api import sync_playwright

URL = 'http://127.0.0.1:8766/website/'
CHAPTERS = {'opening':5,'science':6,'technology':8,'product':6,'market':13,
            'cim':1,'cycle':1,'conclusion':2,'sources':1}

def hash_for(name, state):
    return name if state == 0 else f'{name}-{state+1}'

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width':1440,'height':900}, reduced_motion='reduce')
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    def press(key):
        page.wait_for_function('!locked')
        page.keyboard.press(key)
        page.wait_for_function('!locked')
    page.goto(URL)
    page.evaluate('document.fonts.ready')
    assert page.locator('.section').count()==9
    assert page.locator('.source-item').count()==21
    actual=page.evaluate('Object.fromEntries(Object.entries(steppedChapters).map(([k,v])=>[k,v.steps.length]))')
    assert actual=={k:v for k,v in CHAPTERS.items() if v>1},actual
    # Every narration cue must resolve to an existing chapter state.
    script=(Path(__file__).resolve().parent.parent/'CA1_scripts_revised.md').read_text()
    cues=re.findall(r'\]\(website/index.html#([^)]*)\)',script)
    expected=[hash_for(k,i) for k,n in CHAPTERS.items() if k!='sources' for i in range(n)]
    assert cues==expected,(cues,expected)
    assert page.evaluate('''() => {
        const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);
        return ids.length===new Set(ids).size;
    }'''),'Duplicate HTML/SVG IDs'
    assert page.locator('.cim-mini .cim-arc:not([marker-start])').count()==0
    for width,height in [(1440,900),(1920,1080),(400,800)]:
        page.set_viewport_size({'width':width,'height':height})
        for chapter,n in CHAPTERS.items():
            for state in range(n):
                page.goto(URL+'#'+hash_for(chapter,state))
                page.wait_for_timeout(45)
                assert page.locator('.section.active').get_attribute('id')=='panel-'+chapter
                assert page.locator('.section:not([inert])').count()==1
                dims=page.locator('.section.active .section-scroll').evaluate('(e)=>[e.clientWidth,e.scrollWidth,e.clientHeight,e.scrollHeight]')
                assert dims[1]<=dims[0],(chapter,state,width,'horizontal overflow',dims)
                if width>700 and chapter!='sources':
                    assert dims[3]<=dims[2],(chapter,state,width,'vertical overflow',dims)
                assert page.evaluate('document.body.scrollTop')==0
        print('PASS layout: all states',width,height,flush=True)
    # Internal state progression, reverse boundary and all input paths.
    page.set_viewport_size({'width':1440,'height':900})
    page.goto(URL+'#science')
    press('ArrowDown')
    assert page.evaluate('location.hash')=='#science-2'
    press('ArrowUp')
    assert page.evaluate('location.hash')=='#science'
    press('ArrowUp')
    assert page.evaluate('location.hash')=='#opening-5'
    page.goto(URL+'#product-6')
    page.wait_for_function('!locked')
    page.locator('.prod-next-cue').click()
    assert page.evaluate('location.hash')=='#market'
    press('ArrowUp')
    assert page.evaluate('location.hash')=='#product-6'
    page.goto(URL+'#market-13')
    press('ArrowDown')
    assert page.evaluate('location.hash')=='#cim'
    page.wait_for_function('!locked')
    page.locator('.rail-marker[data-index="7"]').click()
    assert page.evaluate('location.hash')=='#conclusion'
    press('?')
    assert page.locator('dialog').is_visible()
    press('Escape')
    assert not page.locator('dialog').is_visible()
    for key,expected_hash in [('End','#sources'),('Home','#opening'),('PageDown','#opening-2'),('PageUp','#opening'),('Space','#opening-2'),('Shift+Space','#opening')]:
        page.locator('.section.active .section-scroll').focus()
        press(key)
        assert page.evaluate('location.hash')==expected_hash,(key,page.evaluate('location.hash'))
    page.goto(URL+'#sources')
    page.wait_for_function('!locked')
    page.mouse.move(600,600)
    page.mouse.wheel(0,300)
    page.wait_for_timeout(100)
    assert page.locator('.section.active .section-scroll').evaluate('(e)=>e.scrollTop')>0
    # A continuous wheel gesture advances only once, even after the animation lock.
    page.emulate_media(reduced_motion='no-preference')
    page.goto(URL+'#science')
    page.wait_for_timeout(1100)
    page.evaluate('''async () => {
        for(let i=0;i<24;i++){
            window.dispatchEvent(new WheelEvent('wheel',{deltaY:90,cancelable:true}));
            await new Promise(r=>setTimeout(r,65));
        }
    }''')
    assert page.evaluate('location.hash')=='#science-2'
    touch=browser.new_page(viewport={'width':400,'height':800},has_touch=True,is_mobile=True,reduced_motion='reduce')
    touch.goto(URL+'#technology')
    cdp=touch.context.new_cdp_session(touch)
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':200,'y':550}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':200,'y':310}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
    touch.wait_for_timeout(100)
    assert touch.evaluate('location.hash')=='#technology-2'
    # Presenter gutter must remain separate from the slide frame.
    page.emulate_media(reduced_motion='reduce')
    page.set_viewport_size({'width':1920,'height':1080})
    page.goto(URL+'recording.html')
    frame=page.frame_locator('iframe')
    frame.locator('#panel-opening').wait_for()
    slide_frame=page.locator('iframe').bounding_box()
    camera=page.locator('aside figure').bounding_box()
    assert slide_frame['x']+slide_frame['width']<=camera['x']
    for chapter,n in CHAPTERS.items():
        page.frames[1].goto(URL+'#'+hash_for(chapter,n-1))
        page.frames[1].wait_for_function('!locked')
        dims=frame.locator('.section.active .section-scroll').evaluate('(e)=>[e.clientWidth,e.scrollWidth,e.clientHeight,e.scrollHeight]')
        assert dims[1]<=dims[0] and (chapter=='sources' or dims[3]<=dims[2]),(chapter,'presenter frame',dims)
    page.screenshot(path='/private/tmp/hermes-presenter-layout.png')
    assert not errors,errors
    browser.close()
    print('PASS: script cues, model arrows, state navigation, keyboard, wheel, touch, presenter layout and JS errors.')
