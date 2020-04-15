package com.wheretheworkis.qa.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class MethodologyPage extends TestBase {

	@FindBy(xpath = "//a[@href='data/occupation_data.csv']")
	WebElement mothodologyCsvData;

	@FindBy(xpath = "//a[@href='data/data_dictionary.csv']")
	WebElement mothodologyDataDictionayFile;

	TestUtil testUtil;
	String mothodologyCsvDataFilePath = "\\downloadedfiles\\pagefiles\\occupation_data.csv";
	String mothodologyDataDictionayFilePath = "\\downloadedfiles\\pagefiles\\data_dictionary.csv";

	public MethodologyPage() {
		PageFactory.initElements(driver, this);
		testUtil = new TestUtil();
	}

	public boolean validateMethodologyCsvDataFile() {
		return mothodologyCsvData.isDisplayed();
	}

	public boolean validateMethodologyDataDictionayFile() {
		return mothodologyDataDictionayFile.isDisplayed();
	}

	public boolean validateMethodologyCsvDataFileDownload() {
		testUtil.deleteFile(mothodologyCsvDataFilePath);
		mothodologyCsvData.click();
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return testUtil.checkFileExists(mothodologyCsvDataFilePath);
	}

	public boolean validateMethodologyDataDictionayFileDownload() {
		testUtil.deleteFile(mothodologyDataDictionayFilePath);
		mothodologyDataDictionayFile.click();
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return testUtil.checkFileExists(mothodologyDataDictionayFilePath);
	}
}
