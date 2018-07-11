from selenium import webdriver
import time
driver = webdriver.Chrome(executable_path='chromedriver')

auth_url = "https://thworld.net/auth/login"

driver.get(auth_url)
# 设置等待时间，等待页面加载之后再操作
time.sleep(3)

elem_user = driver.find_element_by_id('email')
elem_user.clear()
elem_user.send_keys('email')
elem_pwd = driver.find_element_by_id('passwd')
elem_pwd.clear()
elem_pwd.send_keys('passwd')
time.sleep(1)
driver.find_element_by_id("login").click()
print('login...sleep 10s')
time.sleep(10)

try:
    # use xpath to switch frame
    # driver.switch_to.frame(driver.find_element_by_xpath("//iframe[contains(@src,'https://authedmine.com')]"))
    # use index to switch frame
    driver.switch_to.frame(0)
    print('click verify me')
    driver.find_element_by_id('verify-me').click()

    print('sleep 30s to load verify bar')
    time.sleep(30)
    driver.switch_to.default_content()

    time.sleep(3)

    print(driver.find_element_by_id('checkin-btn').text)
    driver.find_element_by_id('checkin').click()

    print('sleep 5s for checkin')
    time.sleep(5)
    driver.close()
except Exception as e:
    driver.close()
    print('checked in')