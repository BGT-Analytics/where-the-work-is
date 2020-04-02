package com.wheretheworkis.qa.pages;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.PageFactory;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.util.TestUtil;

public class AboutPage extends TestBase{
	
	
	@FindBy(xpath="//a[@href='data/occupation_data.csv']")
	WebElement csvDataFile;
	
	@FindBy(xpath="//a[@href='data/data_dictionary.csv']")
	WebElement dataDictionayFile;
	
	TestUtil testUtil;
	String csvFilePath = "\\downloadedfiles\\pagefiles\\occupation_data.csv";
	String dataDictionayFilePath = "\\downloadedfiles\\pagefiles\\data_dictionary.csv";
	
	public AboutPage(){
		PageFactory.initElements(driver, this);
		testUtil = new TestUtil();
	}
	
	public boolean validateCsvDataFile(){
		return csvDataFile.isDisplayed();
	}
	
	public boolean validateDataDictionayFile(){
		return dataDictionayFile.isDisplayed();
	}
	
	public boolean validateCsvDataFileDownload(){
		testUtil.deleteFile(csvFilePath);
		csvDataFile.click();
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return testUtil.checkFileExists(csvFilePath);
	}
	
	public boolean validateDataDictionayFileDownload(){
		testUtil.deleteFile(dataDictionayFilePath);
		dataDictionayFile.click();
		try {
			Thread.sleep(8000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		return testUtil.checkFileExists(dataDictionayFilePath);
	}
	
	
}
