---
title: Qt OpenCV and OpenGL Integration
date: 2010-11-07T00:24:35+00:00
layout: post
categories:
  - programming
tags:
  - opencv2
  - opengl
  - qt
---

this is a simple Qt+OpenCV+OpenGL integration. this entry will show you how you can capture webcam image using opencv and draw it in Qt apps using opengl texture on GLWidget. requires Qt & OpenCV 2.1 here is our main window code for query and process image from webcam query image from camera

```cpp
void Opencv2Qt::processCam() {
	if (this->capture.isOpened()) {
		timer.restart();
		Mat frame;
		capture >> frame;
		if (frame.data) {
			this->processFrame(frame);
			glWidget->sendImage(&frame);
			ui->statusBar->showMessage("Running....");
			QTimer::singleShot(25, this, SLOT(processCam()));
		}
	}
return;
}
```

lets do something with the frame, this is simple example how to change brightness and contrast

```cpp
void Opencv2Qt::processFrame(Mat& img) {
	const double brightness_gain = 0.5;
	const double contrast_gain = 0.6;
	Mat white(img.size(), CV_8UC3);
	white=Scalar(255,255,255);
	addWeighted(img, contrast_gain, white, 1,-128 + brightness_gain, img);
}
```

i used QTimer to query for new image every 20 milisecond, this is approximately 25-30 fps. enough for conventional webcam. more on how to draw our image to Qt after the jump this is the function to recieve cv::Mat image and convert to opengl image format we create a class for GLWidget

```cpp
void GLWidget::sendImage(Mat* img) {
	qframe = QImage((const unsigned char*)(img->data), img->cols, img->rows, img->step,
	QImage::Format_RGB888).rgbSwapped();
	qframe = QGLWidget::convertToGLFormat(qframe);
	this->updateGL();
}
```

now we will paint our image using PaintGL() function in this example i use 2D texture to render the image. alternatively you can use glDrawPixels to draw the image.

```cpp
void GLWidget::paintGL() {
	glClear (GL_COLOR_BUFFER_BIT);
	glClearColor (0.0,0.0,0.0,1.0);
	if (!qframe.isNull()) {
		qframe = qframe.scaled(this->size(), Qt::IgnoreAspectRatio,Qt::SmoothTransformation);

		// you can use glDrawPixels directly
		// glDrawPixels(qframe.width(),qframe.height(), GL_RGBA, GL_UNSIGNED_BYTE, qframe.bits());

		// or do 2D texture mapping
		glDisable(GL_DEPTH_TEST);
		glMatrixMode(GL_PROJECTION);
		glLoadIdentity();
		gluOrtho2D(0,qframe.width(),qframe.height(),0);
		glMatrixMode(GL_MODELVIEW);
		glLoadIdentity();
		glEnable(GL_TEXTURE_2D);
		glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST);
		glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST);
		glTexImage2D( GL_TEXTURE_2D, 0, 4, qframe.width(), qframe.height(), 0, \
			      GL_RGBA, GL_UNSIGNED_BYTE, qframe.bits() );
		glBegin(GL_QUADS);
		glTexCoord2f(0,0); glVertex2f(0,qframe.height());
		glTexCoord2f(0,1); glVertex2f(0,0);
		glTexCoord2f(1,1); glVertex2f(qframe.width(),0);
		glTexCoord2f(1,0); glVertex2f(qframe.width(),qframe.height());
		glEnd();
		glDisable(GL_TEXTURE_2D);
		// .... end

		// some example of alpha blending
		//glEnable(GL_DEPTH_TEST);
		//glEnable(GL_BLEND);
		//glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
		//glColor4f(0.0f,1.0f,1.0f, 0.9f);
		glFlush();
	}
	// qDebug() << "Drawing...";
}
```

...that's it, all done!

**footnote:**
1. why use PaintGL instead of QPainter? oh well..the answer is simple it's fast and can be utilize for complex image processing rendering such as 3D augmented reality.
2. note that this is direct implementation of image capturing from webcam using QTimer. for heavy processing job you might want to consider running processsCAM() and processingFrame() job on different thread.
3. you may download opencv2Qt source code for details until then, happy coding and hope this code can be useful to someone :)
