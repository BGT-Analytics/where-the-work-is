package org.wheretheworkis.qa.listeners;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.testng.ITestResult;
import org.testng.TestListenerAdapter;
import org.wheretheworkis.qa.base.TestBase;

public class ScreenshotListener extends TestListenerAdapter {

	@Override
	public void onTestFailure(ITestResult result) {
		Calendar calendar = Calendar.getInstance();
		SimpleDateFormat formater = new SimpleDateFormat("dd_MM_yyyy_hh_mm_ss");
		String methodName = result.getName();
		if (ITestResult.FAILURE == result.getStatus()) {
			File scrFile = ((TakesScreenshot) TestBase.driver).getScreenshotAs(OutputType.FILE);
			try {
				FileUtils.copyFile(scrFile, new File(System.getProperty("user.dir") + "/failedtestcasescreenshots/"
						+ methodName + formater.format(calendar.getTime()) + ".png"));

			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

}
