"""Record the interactive headset sequence into a short MP4 preview."""
from pathlib import Path
from playwright.sync_api import sync_playwright

out = Path('/private/tmp/technology-research-video')
out.mkdir(parents=True, exist_ok=True)
with sync_playwright() as p:
    browser = p.chromium.launch()
    context = browser.new_context(viewport={'width':1440,'height':900}, record_video_dir=str(out), record_video_size={'width':1440,'height':900})
    page = context.new_page()
    page.goto('http://127.0.0.1:8766/website/#technology', wait_until='networkidle')
    page.wait_for_timeout(2200)
    for _ in range(7):
        page.evaluate("window.dispatchEvent(new WheelEvent('wheel',{deltaY:90,cancelable:true}))")
        page.wait_for_timeout(1900)
    page.wait_for_timeout(1000)
    video_path = await_video = page.video.path()
    await_video = str(video_path)
    context.close()
    browser.close()
    print(await_video)
