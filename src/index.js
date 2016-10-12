import webdriver, { By, until } from "selenium-webdriver";
import "babel-polyfill";

class Jack {
  constructor(hitList = []) {
    this.driver = new webdriver.Builder().forBrowser('chrome').build();
    this.hitList = hitList;
  }

  AddToHitList(address, action) {
    this.hitList.push({ address, action });
  }

  async Ripper() {
    for (let i in this.hitList) {
      const prey = this.hitList[i];
      if (!prey.address || !prey.action) { continue; }
      console.log(`Approaching ${prey.address}`);
      const result = await this.driver.get(prey.address);
      const actionResult = await prey.action();
      console.log('Result: ', actionResult);
      console.log(`Striking ${prey.address} off the list`)
    }

    this.Teardown();
  }

  Teardown() {
    this.driver.quit();
  }
}

const jack = new Jack();
const myGoogleAction = async () => {
  const el = await jack.driver.findElement(By.css('input'));
  return await el.getAttribute('name');
};
const myAppleAction = async () => {
  return await jack.driver.getTitle();
};
jack.AddToHitList('http://www.google.com', myGoogleAction);
jack.AddToHitList('http://www.apple.com', myAppleAction);
jack.Ripper();
