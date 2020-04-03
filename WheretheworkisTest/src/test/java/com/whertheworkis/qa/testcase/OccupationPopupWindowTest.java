package com.whertheworkis.qa.testcase;


import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
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
	
	@BeforeClass
	public void setUp(){
		initialization();
		occupationPopupWindow = new OccupationPopupWindow();
		homePage = new HomePage();
		testUtil = new TestUtil();
		occupationPopupWindow = homePage.clickOnOccupation();
	}
	
	@Test(priority = 2)
	public void occupationPopupTitleTest(){
		String popupTitle = occupationPopupWindow.validateOccupationPopupTitle();
		Assert.assertEquals(popupTitle, "Sales, Marketing & Related Associate Professionals");
	}
	
	@Test(priority = 3)
	public void occupationProfilePieChartPresentTest(){
		boolean flag = occupationPopupWindow.validateOccupationProfilePieChart();
		Assert.assertTrue(flag);
	}
	
	@Test(priority = 1)
	public void projectedLineChartPresentTest(){
		boolean flag = occupationPopupWindow.validateProjectedEmployementLineChart();
		Assert.assertTrue(flag);
	}
	
	@Test(priority = 4)
	public void mouseHoverOnPieChartTest(){
		String toolTip = occupationPopupWindow.validateMouseOverOnPieChart();
		Assert.assertEquals("Full Time", toolTip);
	}
	
	@Test(priority = 5)
	public void mouseHoverOnLineChartTest(){
		String toolTip = occupationPopupWindow.validateMouseHoverLineChart();
		Assert.assertEquals("2015", toolTip);
	}
	
	@Test(priority = 6)
	public void popupCloseButtonTest(){
		boolean flag = occupationPopupWindow.validatePopupWindowCloseButton();
		Assert.assertEquals(flag, false);
	}
	
	@AfterClass
	public void tearDown(){
		driver.quit();
	}

}
