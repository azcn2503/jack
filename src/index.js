import webdriver, { By, until, wait, Key } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";
import chromedriver from "chromedriver";
import "babel-polyfill";

export default class Jack {
  constructor(hitList = []) {
    const service = new chrome.ServiceBuilder(chromedriver.path).build();
    chrome.setDefaultService(service);
    this.driver = new webdriver.Builder().withCapabilities(webdriver.Capabilities.chrome()).build();
    this.webdriver = webdriver;
    this.By = By;
    this.until = until;
    this.wait = wait;
    this.Key = Key;
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

      console.log('...');
      console.log(`Approaching ${prey.address}`);

      try {
        const result = await this.driver.get(prey.address);
      } catch (e) {
        console.error(e);
        continue;
      }

      let actionResults = [];

      for (let j in prey.actions) {
        const action = prey.actions[j];
        try {
          const actionResult = await action(actionResults, (data) => { actionResults.push(data); });
        } catch (e) {
          console.error(e);
          actionResults.push(null);
          continue;
        }

        console.log('Completed that action!');
      }
      console.log(`Striking ${prey.address} off the list`);
    }
    this.Teardown();
  }

  Teardown() {
    this.driver.quit();
  }
}
