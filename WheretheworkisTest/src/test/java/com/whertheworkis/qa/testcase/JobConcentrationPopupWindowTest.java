package com.whertheworkis.qa.testcase;

import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.pages.JobConcentrationPopupWindow;
import com.wheretheworkis.qa.pages.OccupationPopupWindow;
import com.wheretheworkis.qa.pages.ProspectsAcrossLocationsPage;
import com.wheretheworkis.qa.util.TestUtil;


public class JobConcentrationPopupWindowTest extends TestBase{
	
	HomePage homePage;
	OccupationPopupWindow occupationPopupWindow;
	ProspectsAcrossLocationsPage prospectsAcrossLocationsPage;
	JobConcentrationPopupWindow jobConcentrationPopupWindow;
	TestUtil testUtil;
	
	public JobConcentrationPopupWindowTest(){
		super();
	}
	
	@BeforeMethod
	public void setUp(){
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
	
	@Test
	public void occupationDetailMapPresentTest(){
		boolean flag = jobConcentrationPopupWindow.validateOccupationDetailMap();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void occupationNamePresentTest(){
		String occupationName = jobConcentrationPopupWindow.validateOccupationName();
		Assert.assertEquals(occupationName, "for sales, marketing & related associate professionals");
	}
	
	@Test
	public void mapLengendPresentTest(){
		boolean flag = jobConcentrationPopupWindow.validateMapLegend();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void mapNationOrRegionRadioButtonSelectedTest(){
		boolean flag = jobConcentrationPopupWindow.validateMapNationOrRegionRadioButton();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void mapLepOrCityRegionRadioButtonSelectedTest(){
		boolean flag = jobConcentrationPopupWindow.validateMapLepOrCityRegionRadioButton();
		Assert.assertTrue(flag);
	}
	
	@Test void mapLocationMouseHoverTest(){
		boolean flag = jobConcentrationPopupWindow.validateMouseHoverOnMapLOcation();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void jobConcentrationPopupCloseButtonTest(){
		boolean flag = jobConcentrationPopupWindow.validateJobConcentrationPopupCloseButton();
		Assert.assertTrue(flag);
	}
	
	@AfterMethod
	public void tearDown(ITestResult result){
		if(ITestResult.FAILURE==result.getStatus()){
			testUtil.takeScreenShotForFailedTestCase(result.getName());
		}
		driver.quit();
	}

}
