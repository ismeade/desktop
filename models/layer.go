package models

type Template struct {
	Name string `json:"name"`
	Layer
}

type Layer struct {
	Code   string `json:"code"`
	X      int    `json:"x"`
	Y      int    `json:"y"`
	Height int    `json:"height"`
	Width  int    `json:"width"`
}
