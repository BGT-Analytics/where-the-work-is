package com.wheretheworkis.qa.util;

import java.io.File;
import java.io.IOException;
import java.util.List;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.wheretheworkis.qa.base.TestBase;

public class TestUtil extends TestBase{
	
	public static long PAGE_LOAD_TIMEOUT = 40;
	public static long IMPLICIT_WAIT = 40;
	
	File file;
	
	public void dropDownSelect(WebElement element,List<WebElement> elementList, String textToBeSelected){
		element.click();
		for(WebElement elementListMember:elementList ){
			if((elementListMember.getText()).equals(textToBeSelected)){
				elementListMember.click();
				break;
			}
		}
		
	}
	public void mouseHoverOnElement(WebElement elementToBeMouseHover){
		Actions action = new Actions(driver);
		action.clickAndHold().moveToElement(elementToBeMouseHover);
		action.moveToElement(elementToBeMouseHover).build().perform();
	}
	public void clickOnElement(WebElement elementToBeClicked){
		Actions action = new Actions(driver);
		action.click(elementToBeClicked);
	}
	
	public void waitForElementToBeVisible(WebElement elementToBeVisible, int timeoutSeconds){
		WebDriverWait wait = new WebDriverWait(driver, timeoutSeconds);
		wait.ignoring(StaleElementReferenceException.class).until(ExpectedConditions.visibilityOf(elementToBeVisible));
		
	}
	
	public boolean checkFileExists(String filePath){
		file = new File(System.getProperty("user.dir")+ filePath );
		return file.exists();		
	}
	
	public void deleteFile(String filePath){
		file = new File(System.getProperty("user.dir")+ filePath );
		file.delete();
	}
	
	public void takeScreenShotForFailedTestCase(String testCaseName){
		File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
		String currentDir = System.getProperty("user.dir");
		try {
			FileUtils.copyFile(scrFile, new File(currentDir + "/failedtestcasescreenshots/" + testCaseName + System.currentTimeMillis()+ ".png"));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	

}
