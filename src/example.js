import Jack from './index.js';

const jack = new Jack();

let urls = [];
for (let i = 374553; i < 374563; i += 1) {
  jack.AddToHitList(`https://www.google.com`, [
    async () => {
      const searchField = await jack.driver.findElement(jack.By.css('input[type=text][name=q]'));
      await searchField.sendKeys(`testing ${i}` + jack.Key.RETURN);
      await jack.driver.wait(jack.until.elementLocated(jack.By.css('h3.r')));
      const title = await jack.driver.findElement(jack.By.css('h3.r')).getAttribute('innerText');
      console.log(title);
      return title;
    }
  ]);
}

jack.Ripper();