package com.whertheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.pages.OccupationPopupWindow;
import com.wheretheworkis.qa.pages.ProspectsAcrossLocationsPage;
import com.wheretheworkis.qa.util.TestUtil;

public class ProspectsAcrossLocationsPageTest extends TestBase{
	
	HomePage homePage;
	OccupationPopupWindow occupationPopupWindow;
	ProspectsAcrossLocationsPage prospectsAcrossLocationsPage;
	TestUtil testUtil;
	
	public ProspectsAcrossLocationsPageTest(){
		super();
	}
	
	@BeforeMethod
	public void setUp(){
		initialization();
		homePage = new HomePage();
		testUtil = new TestUtil();
		occupationPopupWindow = new OccupationPopupWindow();
		prospectsAcrossLocationsPage = new ProspectsAcrossLocationsPage();
		occupationPopupWindow = homePage.clickOnOccupation();
		prospectsAcrossLocationsPage = occupationPopupWindow.mouseClickOnProspectAcrossLocations();
	}
	
	@Test
	public void occupationTablePresentTest(){
		boolean flag = prospectsAcrossLocationsPage.validateOccupationTable();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void dropDownDefaultSelectedOccupationTest(){
		String selectedOccupation = prospectsAcrossLocationsPage.validateDropDownDefaultSelectedOccupation();
		Assert.assertEquals(selectedOccupation, "Sales, Marketing & Related Associate Professionals");
	}
	
	@Test
	public void nationOrRegionRadioButtonTest(){
		boolean flag = prospectsAcrossLocationsPage.validateNationOrRegionRadioButton();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void lepareaOrCityRegionRadioButtonTest(){
		boolean flag = prospectsAcrossLocationsPage.validateLepareaOrCityRegionRadioButton();
		Assert.assertTrue(flag);
	}
	
	
	@Test
	public void jobConcentrationMapButtonPresentTest(){
		boolean flag = prospectsAcrossLocationsPage.validateJobConcentrationMapButton();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void jobConcentrationMapPopupPresentTest(){
		int numberOfWindows = prospectsAcrossLocationsPage.validateJobConcentartionMapPopup();
		Assert.assertEquals(numberOfWindows, 1);
	}
	
	@Test
	public void backButtonTest(){
		Assert.assertTrue(prospectsAcrossLocationsPage.validateBackButton());
	}
	
	@AfterMethod
	public void tearDown(ITestResult result){
		if(ITestResult.FAILURE==result.getStatus()){
			testUtil.takeScreenShotForFailedTestCase(result.getName());
		}
		driver.quit();
	}
	
}
