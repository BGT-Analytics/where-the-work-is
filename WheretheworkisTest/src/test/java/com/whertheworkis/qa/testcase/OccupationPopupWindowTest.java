package com.whertheworkis.qa.testcase;


import org.testng.Assert;
import org.testng.ITestResult;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;


import org.testng.annotations.Test;

import com.wheretheworkis.qa.base.TestBase;
import com.wheretheworkis.qa.pages.HomePage;
import com.wheretheworkis.qa.pages.OccupationPopupWindow;
import com.wheretheworkis.qa.util.TestUtil;

public class OccupationPopupWindowTest extends TestBase {
	
	HomePage homePage;
	OccupationPopupWindow occupationPopupWindow;
	TestUtil testUtil;
	
	public OccupationPopupWindowTest(){
		super();
	}
	
	@BeforeMethod
	public void setUp(){
		initialization();
		occupationPopupWindow = new OccupationPopupWindow();
		homePage = new HomePage();
		testUtil = new TestUtil();
		occupationPopupWindow = homePage.clickOnOccupation();
	}
	
	@Test
	public void occupationPopupTitleTest(){
		String popupTitle = occupationPopupWindow.validateOccupationPopupTitle();
		Assert.assertEquals(popupTitle, "Sales, Marketing & Related Associate Professionals");
	}
	
	@Test
	public void occupationProfilePieChartPresentTest(){
		boolean flag = occupationPopupWindow.validateOccupationProfilePieChart();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void projectedLineChartPresentTest(){
		boolean flag = occupationPopupWindow.validateProjectedEmployementLineChart();
		Assert.assertTrue(flag);
	}
	
	@Test
	public void mouseHoverOnPieChartTest(){
		String toolTip = occupationPopupWindow.validateMouseOverOnPieChart();
		Assert.assertEquals("Full Time", toolTip);
	}
	
	@Test
	public void mouseHoverOnLineChartTest(){
		String toolTip = occupationPopupWindow.validateMouseHoverLineChart();
		Assert.assertEquals("2015", toolTip);
	}
	
	@Test
	public void popupCloseButtonTest(){
		boolean flag = occupationPopupWindow.validatePopupWindowCloseButton();
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
