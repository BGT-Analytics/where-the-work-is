package com.whertheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.AboutPage;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.util.TestUtil;

public class AboutPageTest extends TestBase{
	
	HomePage homePage;
	AboutPage aboutPage;
	TestUtil testUtil;
	
	public AboutPageTest(){
		super();
	}
	
	@BeforeMethod
	public void setUp(){
		initialization();
		homePage = new HomePage();
		aboutPage = new AboutPage();
		testUtil = new TestUtil();
		aboutPage = homePage.clickOnAboutPageLink();
	}
	
	@Test
	public void csvDataFilePresentTest(){
		Assert.assertTrue(aboutPage.validateCsvDataFile());
	}
	
	@Test
	public void dataDictionayFilePresentTest(){
		Assert.assertTrue(aboutPage.validateDataDictionayFile());
	}
	
	@Test
	public void csvDataFileDownloadTest(){
		Assert.assertTrue(aboutPage.validateCsvDataFileDownload());
	}
	
	@Test
	public void dataDictionayFileDownloadTest(){
		Assert.assertTrue(aboutPage.validateDataDictionayFileDownload());
	}
	
	@AfterMethod
	public void tearDown(ITestResult result){
		if(ITestResult.FAILURE==result.getStatus()){
			testUtil.takeScreenShotForFailedTestCase(result.getName());
		}
		driver.quit();
	}

}
