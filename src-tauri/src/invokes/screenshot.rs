use std::fs;
use screenshots::Screen;
use tauri::{
    api::{path::home_dir, shell::open},
    PhysicalPosition,
};

use crate::setup;

// 截屏
pub fn capture_full(position: PhysicalPosition<i32>, file_name: String) -> Vec<u8> {
    let screen = Screen::from_point(position.x, position.y).unwrap();

    let image = screen.capture().unwrap();
    let buffer = image.to_png(None).unwrap();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.teacherAI/{}.png", home_path.display(), file_name);
    println!("{}", path);
    fs::write(path, buffer.clone()).unwrap();
    return buffer.to_vec();
}

// 区域截屏
pub fn capture_region(x: i32, y: i32, width: u32, height: u32, file_name: String) -> Vec<u8> {
    let screen = Screen::from_point(x, y).unwrap();

    let image = screen.capture_area(x, y, width, height).unwrap();
    let buffer = image.to_png(None).unwrap();
    let home_path = home_dir().unwrap();

    let path = format!("{}/.teacherAI/{}.png", home_path.display(), file_name);
    println!("{}", path);
    fs::write(path, buffer.clone()).unwrap();
    return buffer.to_vec();
}

// 获取截屏文件夹路径
pub fn get_screenshot_dir() -> String {
    let home_path = home_dir().unwrap();
    let path = format!("{}/.teacherAI", home_path.display());
    return path;
}

// 清除截屏文件夹里的文件，但不删除文件夹
pub fn clear_screenshot_dir() {
    let home_path = home_dir().unwrap();
    let path = format!("{}/.teacherAI", home_path.display());
    fs::remove_dir_all(path).unwrap();
    setup::create_dir();
}
