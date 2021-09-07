package main

import (
	"github.com/gin-gonic/gin"
	"github.com/webview/webview"
)

func main() {
	go startWebServer()

	startWebView()
}

func startWebServer() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Static("/", "./static")
	r.Run(":38080")
}

func startWebView() {
	w := webview.New(false)
	defer w.Destroy()
	w.SetTitle("desktop")
	w.SetSize(1000, 800, webview.HintNone)
	w.Navigate("http://localhost:38080/index.html")
	// w.Navigate("./static/index.html")
	w.Run()
}
