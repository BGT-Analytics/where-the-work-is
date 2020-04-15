package com.wheretheworkis.qa.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class JobConcentrationPopupWindow extends TestBase {

	@FindBy(className = "modal-title")
	WebElement jobConcentrationPopupTitle;

	@FindBy(id = "occupation-detail-map")
	WebElement occupationDetailMap;

	@FindBy(id = "modal-occ-name")
	WebElement occupationName;

	@FindBy(xpath = "//div[@class='info legend leaflet-control']")
	WebElement mapLegend;

	@FindBy(id = "mapGeoRegions")
	WebElement mapNationOrRegionRadioButton;

	@FindBy(id = "mapGeoLeps")
	WebElement mapLepOrCityRegionRadioButton;

	@FindBy(css = "#occupation-detail-map > div.leaflet-pane.leaflet-map-pane > div.leaflet-pane.leaflet-overlay-pane > svg > g > path:nth-child(1)")
	WebElement mapLocation;

	@FindBy(xpath = "//table[@class='table table-condensed']")
	WebElement mapHelperInformation;

	@FindBy(xpath = "//button[@type='button' and @class='close']")
	WebElement jobConcentartionPopupCloseButton;

	TestUtil testUtil;

	public JobConcentrationPopupWindow() {
		PageFactory.initElements(driver, this);
		testUtil = new TestUtil();
	}

	public boolean validateOccupationDetailMap() {
		return occupationDetailMap.isDisplayed();
	}

	public String validateOccupationName() {
		return occupationName.getText();
	}

	public boolean validateMapLegend() {
		return mapLegend.isDisplayed();
	}

	public boolean validateMapNationOrRegionRadioButton() {
		mapNationOrRegionRadioButton.click();
		return mapNationOrRegionRadioButton.isSelected();
	}

	public boolean validateMapLepOrCityRegionRadioButton() {
		mapLepOrCityRegionRadioButton.click();
		return mapLepOrCityRegionRadioButton.isSelected();
	}

	public boolean validateMouseHoverOnMapLocation() {
		testUtil.waitForElementToBeVisible(occupationDetailMap, 5);
		testUtil.mouseHoverOnElement(mapLocation);
		return mapHelperInformation.isDisplayed();
	}

	public boolean validateJobConcentrationPopupCloseButton() {
		jobConcentartionPopupCloseButton.click();
		return jobConcentrationPopupTitle.isDisplayed();
	}

}
