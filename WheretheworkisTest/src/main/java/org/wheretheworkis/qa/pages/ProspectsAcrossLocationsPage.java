package org.wheretheworkis.qa.pages;

import java.util.Iterator;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;
import org.wheretheworkis.qa.base.TestBase;
import org.wheretheworkis.qa.util.TestUtil;

public class ProspectsAcrossLocationsPage extends TestBase {

	@FindBy(id = "occ-table")
	WebElement occupationTable;

	@FindBy(xpath = "//span[@id='current-occ-name']/small")
	WebElement dropDownMenuDefaultSelectedOccupation;

	@FindBy(id = "geo-level-region")
	WebElement nationOrRegionRadioButton;

	@FindBy(id = "geo-level-lep")
	WebElement lepareaOrCityRegionRadioButton;

	@FindBy(css = "body > div:nth-child(3) > div:nth-child(2) > div > p.pull-right.hidden-xs > a")
	WebElement jobConcentrationMapButton;

	@FindBy(className = "modal-title")
	WebElement jobConcentrationPopupTitle;

	@FindBy(id = "occ-back")
	WebElement backButton;

	@FindBy(xpath = "//button[@type='button' and @class='close']")
	WebElement jobConcentartionPopupCloseButton;

	TestUtil testutil;

	public ProspectsAcrossLocationsPage() {
		PageFactory.initElements(driver, this);
		testutil = new TestUtil();

	}

	public boolean validateOccupationTable() {
		return occupationTable.isDisplayed();
	}

	public String validateDropDownDefaultSelectedOccupation() {
		return dropDownMenuDefaultSelectedOccupation.getText();
	}

	public boolean validateNationOrRegionRadioButton() {
		return nationOrRegionRadioButton.isSelected();
	}

	public boolean validateLepareaOrCityRegionRadioButton() {
		lepareaOrCityRegionRadioButton.click();
		return lepareaOrCityRegionRadioButton.isSelected();
	}

	public boolean validateJobConcentrationMapButton() {
		return jobConcentrationMapButton.isDisplayed();
	}

	public int validateJobConcentartionMapPopup() {
		jobConcentrationMapButton.click();
		testutil.waitForElementToBeVisible(jobConcentrationPopupTitle, 5);
		Set<String> handles = driver.getWindowHandles();
		Iterator<String> iterator = handles.iterator();
		String popupWindow = iterator.next();
		driver.switchTo().window(popupWindow);
		jobConcentartionPopupCloseButton.click();
		return handles.size();
	}

	public boolean validateBackButton() {
		backButton.click();
		boolean flag = driver.findElement(By.id("occ-info-pane")).isDisplayed();
		return flag;
	}

	public JobConcentrationPopupWindow clickOnJobConcentrationMapButton() {
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		jobConcentrationMapButton.sendKeys(Keys.ENTER);
		testutil.waitForElementToBeVisible(jobConcentrationPopupTitle, 5);
		Set<String> handles = driver.getWindowHandles();
		Iterator<String> iterator = handles.iterator();
		String popupWindow = iterator.next();
		driver.switchTo().window(popupWindow);
		return new JobConcentrationPopupWindow();
	}

}
