package org.wheretheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.wheretheworkis.qa.base.TestBase;
import org.wheretheworkis.qa.pages.AboutPage;
import org.wheretheworkis.qa.pages.HomePage;
import org.wheretheworkis.qa.util.TestUtil;

public class AboutPageTest extends TestBase {

	HomePage homePage;
	AboutPage aboutPage;
	TestUtil testUtil;

	public AboutPageTest() {
		super();
	}

	@BeforeClass
	public void setUp() {
		initialization();
		homePage = new HomePage();
		aboutPage = new AboutPage();
		testUtil = new TestUtil();
		aboutPage = homePage.clickOnAboutPageLink();
	}

	@Test
	public void csvDataFilePresentTest() {
		Assert.assertTrue(aboutPage.validateCsvDataFile());
	}

	@Test
	public void dataDictionayFilePresentTest() {
		Assert.assertTrue(aboutPage.validateDataDictionayFile());
	}

	@AfterClass(alwaysRun = true)
	public void tearDown() {
		driver.quit();
	}

}
