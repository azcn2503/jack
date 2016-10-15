import Jack from './index.js';

const jack = new Jack();

let urls = [];
for (let i = 374553; i < 374563; i += 1) {
  jack.AddToHitList(`https://example.site/${i}`, [
    async () => {
      const usernameField = await jack.driver.findElement(jack.By.css('input#UserName'));
      const passwordField = await jack.driver.findElement(jack.By.css('input#Password'));
      const submitButton = await jack.driver.findElement(jack.By.css('button#Log_In'));
      await usernameField.sendKeys('username');
      await passwordField.sendKeys('password');
      await submitButton.click();
    },
    async () => {
      // Something I should do after logging in
      return true;
    }
  ]);
}

jack.Ripper();