package org.wheretheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;
import org.wheretheworkis.qa.base.TestBase;
import org.wheretheworkis.qa.pages.HomePage;
import org.wheretheworkis.qa.pages.OccupationPopupWindow;
import org.wheretheworkis.qa.pages.ProspectsAcrossLocationsPage;
import org.wheretheworkis.qa.util.TestUtil;

public class ProspectsAcrossLocationsPageTest extends TestBase {

	HomePage homePage;
	OccupationPopupWindow occupationPopupWindow;
	ProspectsAcrossLocationsPage prospectsAcrossLocationsPage;
	TestUtil testUtil;

	public ProspectsAcrossLocationsPageTest() {
		super();
	}

	@BeforeClass
	public void setUp() {
		initialization();
		homePage = new HomePage();
		testUtil = new TestUtil();
		occupationPopupWindow = new OccupationPopupWindow();
		prospectsAcrossLocationsPage = new ProspectsAcrossLocationsPage();
		occupationPopupWindow = homePage.clickOnOccupation();
		prospectsAcrossLocationsPage = occupationPopupWindow.mouseClickOnProspectAcrossLocations();
	}

	@Test(priority = 1)
	public void occupationTablePresentTest() {
		boolean flag = prospectsAcrossLocationsPage.validateOccupationTable();
		Assert.assertTrue(flag);
	}

	@Test(priority = 2)
	public void dropDownDefaultSelectedOccupationTest() {
		String selectedOccupation = prospectsAcrossLocationsPage.validateDropDownDefaultSelectedOccupation();
		Assert.assertEquals(selectedOccupation, "Sales, Marketing & Related Associate Professionals");
	}

	@Test(priority = 3)
	public void nationOrRegionRadioButtonTest() {
		boolean flag = prospectsAcrossLocationsPage.validateNationOrRegionRadioButton();
		Assert.assertTrue(flag);
	}

	@Test(priority = 4)
	public void lepareaOrCityRegionRadioButtonTest() {
		boolean flag = prospectsAcrossLocationsPage.validateLepareaOrCityRegionRadioButton();
		Assert.assertTrue(flag);
	}

	@Test(priority = 5)
	public void jobConcentrationMapButtonPresentTest() {
		boolean flag = prospectsAcrossLocationsPage.validateJobConcentrationMapButton();
		Assert.assertTrue(flag);
	}

	@Test(priority = 6)
	public void jobConcentrationMapPopupPresentTest() {
		int numberOfWindows = prospectsAcrossLocationsPage.validateJobConcentartionMapPopup();
		Assert.assertEquals(numberOfWindows, 1);
	}

	@Test(priority = 7)
	public void backButtonTest() {
		Assert.assertTrue(prospectsAcrossLocationsPage.validateBackButton());
	}

	@AfterClass(alwaysRun = true)
	public void tearDown() {
		driver.quit();
	}

}
