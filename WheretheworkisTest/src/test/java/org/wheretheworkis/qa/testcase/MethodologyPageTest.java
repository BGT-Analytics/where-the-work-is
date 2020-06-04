package org.wheretheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.wheretheworkis.qa.base.TestBase;
import org.wheretheworkis.qa.pages.HomePage;
import org.wheretheworkis.qa.pages.MethodologyPage;
import org.wheretheworkis.qa.util.TestUtil;

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
    
	@AfterClass(alwaysRun = true)
	public void tearDown() {
		driver.quit();
	}

}
