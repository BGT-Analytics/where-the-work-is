package com.wheretheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.pages.MethodologyPage;
import com.wheretheworkis.qa.util.TestUtil;

public class MethodologyPageTest extends TestBase {

	HomePage homePage;
	MethodologyPage methodologyPage;
	TestUtil testUtil;

	public MethodologyPageTest() {
		super();
	}

	@BeforeClass
	public void setUp() {
		initialization();
		homePage = new HomePage();
		testUtil = new TestUtil();
		methodologyPage = new MethodologyPage();
		methodologyPage = homePage.clickOnMethodologyPage();
	}

	@Test
	public void methodologyCsvDataFilePresentTest() {
		Assert.assertTrue(methodologyPage.validateMethodologyCsvDataFile());
	}

	@Test
	public void methodologyDataDictionayFilePresentTest() {
		Assert.assertTrue(methodologyPage.validateMethodologyDataDictionayFile());
	}

/*	@Test
	public void methodologyCsvDataFileDownloadTest() {
		Assert.assertTrue(methodologyPage.validateMethodologyCsvDataFileDownload());
	}

	@Test
	public void methodologyDataDictionayFileDownloadTest() {
		Assert.assertTrue(methodologyPage.validateMethodologyDataDictionayFileDownload());
	}*/
    
	@AfterClass(alwaysRun = true)
	public void tearDown() {
		driver.quit();
	}

}
