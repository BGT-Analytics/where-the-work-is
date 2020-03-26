package com.wheretheworkis.qa.pages;

import java.util.Iterator;
import java.util.Set;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class ProspectsAcrossLocationsPage extends TestBase {
	
	@FindBy(id="occ-table")
	WebElement occupationTable;
	
	@FindBy(xpath="//span[@id='current-occ-name']/small")
	WebElement dropDownMenuDefaultSelectedOccupation;
	
	@FindBy(id="geo-level-region")
	WebElement nationOrRegionRadioButton;
	
	@FindBy(id="geo-level-lep")
	WebElement lepareaOrCityRegionRadioButton;
	
	@FindBy(xpath="(//a[@class='btn-occ-lq btn btn-default'])[1]")
	WebElement jobConcentrationMapButton;
	
	@FindBy(className="modal-title")
	WebElement jobConcentrationPopupTitle;
	
	@FindBy(id="occ-back")
	WebElement backButton;
	
	TestUtil testutil;
	
	public ProspectsAcrossLocationsPage(){
		PageFactory.initElements(driver, this);
		testutil = new TestUtil();
		
	}
	
	public boolean validateOccupationTable(){
		return occupationTable.isDisplayed();
	}
	
	public String validateDropDownDefaultSelectedOccupation(){
		return dropDownMenuDefaultSelectedOccupation.getText();
	}
	
	public boolean validateNationOrRegionRadioButton(){
		return nationOrRegionRadioButton.isSelected();
	}
	
	public boolean validateLepareaOrCityRegionRadioButton(){
		lepareaOrCityRegionRadioButton.click();
		return lepareaOrCityRegionRadioButton.isSelected();
	}
	
	public boolean validateJobConcentrationMapButton(){
		return jobConcentrationMapButton.isDisplayed();
	}
	
	public int validateJobConcentartionMapPopup(){
		jobConcentrationMapButton.click();
		testutil.waitForElementToBeVisible(jobConcentrationPopupTitle, 5);
		return driver.getWindowHandles().size();
	}
	
	public boolean validateBackButton(){
		backButton.click();
		return driver.findElement(By.id("occ-info-pane")).isDisplayed();
	}
	
	public JobConcentrationPopupWindow clickOnJobConcentrationMapButton(){
		jobConcentrationMapButton.click();
		testutil.waitForElementToBeVisible(jobConcentrationPopupTitle, 5);
		Set<String> handles = driver.getWindowHandles();
		Iterator<String> iterator = handles.iterator();
		String popupWindow = iterator.next();
		driver.switchTo().window(popupWindow);
		return new JobConcentrationPopupWindow();	
	}
	
	

}
