package org.wheretheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.wheretheworkis.qa.base.TestBase;
import org.wheretheworkis.qa.pages.HomePage;
import org.wheretheworkis.qa.pages.JobConcentrationPopupWindow;
import org.wheretheworkis.qa.pages.OccupationPopupWindow;
import org.wheretheworkis.qa.pages.ProspectsAcrossLocationsPage;
import org.wheretheworkis.qa.util.TestUtil;

public class JobConcentrationPopupWindowTest extends TestBase {

	HomePage homePage;
	OccupationPopupWindow occupationPopupWindow;
	ProspectsAcrossLocationsPage prospectsAcrossLocationsPage;
	JobConcentrationPopupWindow jobConcentrationPopupWindow;
	TestUtil testUtil;

	public JobConcentrationPopupWindowTest() {
		super();
	}

	@BeforeClass
	public void setUp() {
		initialization();
		homePage = new HomePage();
		testUtil = new TestUtil();
		occupationPopupWindow = new OccupationPopupWindow();
		prospectsAcrossLocationsPage = new ProspectsAcrossLocationsPage();
		jobConcentrationPopupWindow = new JobConcentrationPopupWindow();
		occupationPopupWindow = homePage.clickOnOccupation();
		prospectsAcrossLocationsPage = occupationPopupWindow.mouseClickOnProspectAcrossLocations();
		jobConcentrationPopupWindow = prospectsAcrossLocationsPage.clickOnJobConcentrationMapButton();
	}

	@Test(priority = 1)
	public void occupationDetailMapPresentTest() {
		boolean flag = jobConcentrationPopupWindow.validateOccupationDetailMap();
		Assert.assertTrue(flag);
	}

	@Test(priority = 2)
	public void occupationNamePresentTest() {
		String occupationName = jobConcentrationPopupWindow.validateOccupationName();
		Assert.assertEquals(occupationName, "for sales, marketing & related associate professionals");
	}

	@Test(priority = 3)
	public void mapLengendPresentTest() {
		boolean flag = jobConcentrationPopupWindow.validateMapLegend();
		Assert.assertTrue(flag);
	}

	@Test(priority = 5)
	public void mapNationOrRegionRadioButtonSelectedTest() {
		boolean flag = jobConcentrationPopupWindow.validateMapNationOrRegionRadioButton();
		Assert.assertTrue(flag);
	}

	@Test(priority = 4)
	public void mapLepOrCityRegionRadioButtonSelectedTest() {
		boolean flag = jobConcentrationPopupWindow.validateMapLepOrCityRegionRadioButton();
		Assert.assertTrue(flag);
	}

	@Test(priority = 6)
	public void mapLocationMouseHoverTest() {
		boolean flag = jobConcentrationPopupWindow.validateMouseHoverOnMapLocation();
		Assert.assertTrue(flag);
	}

	@Test(priority = 7)
	public void jobConcentrationPopupCloseButtonTest() {
		boolean flag = jobConcentrationPopupWindow.validateJobConcentrationPopupCloseButton();
		Assert.assertEquals(flag, true);
	}

	@AfterClass(alwaysRun = true)
	public void tearDown() {
		driver.quit();
	}

}
