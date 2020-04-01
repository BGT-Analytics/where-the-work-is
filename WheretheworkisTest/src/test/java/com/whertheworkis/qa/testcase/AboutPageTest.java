package com.whertheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;


import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.AboutPage;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.util.TestUtil;

public class AboutPageTest extends TestBase {
	
	HomePage homePage;
	AboutPage aboutPage;
	TestUtil testUtil;
	
	public AboutPageTest(){
		super();
	}
	
	@BeforeClass
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
	
	@AfterClass
	public void tearDown(){
		driver.quit();
	}

}
