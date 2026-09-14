"""Checks for the scroll-controlled technology explanation."""
from playwright.sync_api import sync_playwright

URL='http://127.0.0.1:8766/website/'
with sync_playwright() as p:
    browser=p.chromium.launch()
    page=browser.new_page(viewport={'width':1440,'height':900})
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL+'#technology',wait_until='networkidle')
    page.wait_for_timeout(1300)
    def step(): return page.locator('.tech-step-active').get_attribute('data-tech-step')
    assert step()=='0'
    page.evaluate('window.originalHeadset = document.querySelector(".headset-film")')
    # Sustained gesture must not run through several internal steps.
    # Dispatch one continuous stream in the browser to avoid automation
    # round-trip gaps being mistaken for separate human gestures.
    page.evaluate('''async () => {
        for(let i=0;i<30;i++) {
            window.dispatchEvent(new WheelEvent('wheel',{deltaY:90,cancelable:true}));
            await new Promise(resolve=>setTimeout(resolve,65));
        }
    }''')
    assert step()=='1'
    page.wait_for_timeout(250)
    assert page.locator('#page-number').inner_text()=='03'
    for i in range(2,8):
        page.mouse.wheel(0,90)
        page.wait_for_timeout(1550)
        assert step()==str(i),(i,step())
        assert page.locator('.tech-step:not([hidden])').count()==1
        assert page.evaluate('window.originalHeadset === document.querySelector(".headset-film")')
    page.mouse.wheel(0,90)
    page.wait_for_timeout(1300)
    assert page.locator('#page-number').inner_text()=='04'
    page.keyboard.press('ArrowUp')
    page.wait_for_timeout(1300)
    assert step()=='7'
    page.keyboard.press('ArrowUp')
    page.wait_for_timeout(1550)
    assert step()=='6'
    page.locator('[data-tech-jump="2"]').click()
    page.wait_for_timeout(1550)
    assert step()=='2'
    assert page.locator('[data-tech-jump="2"]').get_attribute('aria-current')=='step'
    page.screenshot(path='/private/tmp/hermes-tech-direction.png')
    page.goto(URL+'#technology-4')
    page.wait_for_timeout(1550)
    assert step()=='3'
    page.screenshot(path='/private/tmp/hermes-tech-timing.png')
    page.emulate_media(reduced_motion='reduce')
    for width,height in [(1440,900),(400,800)]:
        page.set_viewport_size({'width':width,'height':height})
        for i in range(8):
            page.goto(URL+f'#technology-{i+1}')
            page.wait_for_timeout(180)
            assert step()==str(i)
            dimensions=page.locator('.section.active .section-scroll').evaluate('(el)=>[el.clientWidth,el.scrollWidth,el.clientHeight,el.scrollHeight]')
            assert dimensions[1]<=dimensions[0],(width,i,dimensions)
            assert dimensions[3]==dimensions[2],(width,i,dimensions)
            assert page.evaluate('''() => {
                const caption=document.querySelector('.tech-step-active').getBoundingClientRect();
                const film=document.querySelector('.headset-cinema').getBoundingClientRect();
                const controls=document.querySelector('.tech-bottom').getBoundingClientRect();
                return caption.top>=film.bottom && caption.bottom<=controls.top;
            }'''),(width,i,'Caption overlaps film or controls')
            assert page.evaluate('document.body.scrollTop')==0
            print(width,'step',i+1,dimensions,flush=True)
            if width==400 and i in [1,3,7]:page.screenshot(path=f'/private/tmp/hermes-tech-mobile-{i+1}.png')
    touch=browser.new_page(viewport={'width':400,'height':800},has_touch=True,is_mobile=True,reduced_motion='reduce')
    touch.goto(URL+'#technology')
    touch.evaluate('document.fonts.ready')
    cdp=touch.context.new_cdp_session(touch)
    # Start in the content, not on the numbered step buttons.
    cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':200,'y':550}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':200,'y':310}]})
    cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
    touch.wait_for_timeout(200)
    assert touch.locator('.tech-step-active').get_attribute('data-tech-step')=='1'
    assert not errors,errors
    browser.close()
    print('PASS: nested gestures, sustained wheel lock, forward/back boundary, step buttons, deep links, layouts, touch and reduced motion.')
