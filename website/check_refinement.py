"""Lightweight runtime checks; no visual design review or screenshots."""
from playwright.sync_api import sync_playwright

URL='http://127.0.0.1:8766/website/'
COUNTS={'opening':3,'science':6,'technology':8,'product':6,'market':4,'cim':5,'conclusion':2,'sources':1}
with sync_playwright() as p:
    browser=p.chromium.launch()
    page=browser.new_page(viewport={'width':1920,'height':1080},reduced_motion='reduce')
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL)
    page.wait_for_function('typeof chapterAt === "function"')
    states=[name+(f'-{i+1}' if i else '') for name,count in COUNTS.items() for i in range(count)]
    for state in states:
        page.goto(URL+'#'+state)
        page.wait_for_function('!locked')
        assert page.locator('.section.active').count()==1,state
        assert page.evaluate('currentHash()')=='#'+state,state
        assert page.locator('.section.active').inner_text().strip(),state
        assert page.evaluate('document.body.scrollTop===0'),state
        assert page.locator('.section.active img').evaluate_all('(images)=>images.every(i=>i.complete && i.naturalWidth>0)'),state
    # Traverse the whole deck in both directions using the actual keyboard handler.
    page.goto(URL+'#opening')
    for state in states[1:]:
        page.wait_for_function('!locked');page.keyboard.press('ArrowRight')
        page.wait_for_function('!locked')
        assert page.evaluate('currentHash()')=='#'+state,state
    for state in states[-2::-1]:
        page.keyboard.press('ArrowLeft');page.wait_for_function('!locked')
        assert page.evaluate('currentHash()')=='#'+state,state
    page.goto(URL+'#cim-3');page.keyboard.press('n')
    assert page.locator('.cue-panel').is_visible()
    assert 'cost' in page.locator('.cue-panel').inner_text().lower()
    page.keyboard.press('n');assert not page.locator('.cue-panel').is_visible()
    page.keyboard.press('r')
    # Layout smoke check only: document width and visible chapter content at mobile size.
    page.set_viewport_size({'width':400,'height':800})
    for state in ['opening','market-4','cim','cycle-4','conclusion']:
        page.goto(URL+'#'+state)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth+1'),state
    page.set_viewport_size({'width':1920,'height':1080})
    page.goto(URL+'recording.html')
    assert page.locator('iframe').count()==1
    frame=page.frame_locator('iframe')
    assert frame.locator('.section.active').count()==1
    assert page.locator('figure').bounding_box()['x']>1500
    assert not errors,errors
    print('PASS: 35 states, all chapter content/assets, forward/back keyboard navigation, cues, replay smoke check, mobile width, portrait layout, no JS errors.')
    browser.close()
