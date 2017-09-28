call mvn package -Dmaven.test.skip=true
cd target
del slot.war
::pause
ren Slot-0.0.1-SNAPSHOT.war slot.war
copy slot.war C:\\Users\puqian\Programs\jetty2\webapps\ /Y

:: merge resources
::del C:\Users\puqian\Programs\jetty2\resources\* /F /Q
::copy C:\Users\puqian\Programs\RegressionFeedback\RegressionFeedback\resources\* C:\Users\puqian\Programs\jetty2\resources\ /Y

cd C:\\Users\puqian\Programs\jetty2
java -jar start.jar