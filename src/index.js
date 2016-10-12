import webdriver, { By, until } from "selenium-webdriver";
import "babel-polyfill";

class Jack {
  constructor(hitList = []) {
    this.driver = new webdriver.Builder().forBrowser('chrome').build();
    this.hitList = hitList;
  }

  AddToHitList(address, actions) {
    this.hitList.push({ address, actions });
  }

  async Ripper() {
    for (let i in this.hitList) {
      let prey = this.hitList[i];
      if (!prey.address || !prey.actions) { continue; }
      if (typeof(prey.actions) !== 'object') { prey.actions = [prey.actions]; }
      console.log(`Approaching ${prey.address}`);
      const result = await this.driver.get(prey.address);
      for (let j in prey.actions) {
        const action = prey.actions[j];
        const actionResult = await action();
        console.log(actionResult);
      }
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
jack.AddToHitList('http://www.google.com', [myGoogleAction, myGoogleAction]);
jack.AddToHitList('http://www.apple.com', myAppleAction);
jack.Ripper();
