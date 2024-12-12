use std::fs;
use screenshots::Screen;
use tauri::{
    api::{path::home_dir, shell::open},
    PhysicalPosition,
};
use windows::{
    Win32::Graphics::Gdi::{GetDC, GetDeviceCaps, LOGPIXELSX},
    Win32::Foundation::HWND,
};

use crate::setup;

// 获取Windows系统的屏幕缩放比例
fn get_scale_factor(_screen: &Screen) -> f64 {
    unsafe {
        let hdc = GetDC(HWND(0));
        if !hdc.is_invalid() {
            // 获取系统DPI
            let dpi = GetDeviceCaps(hdc, LOGPIXELSX);
            // 将DPI转换为缩放比例（96 DPI 是标准 DPI）
            return dpi as f64 / 96.0;
        }
    }
    // 如果获取失败，返回默认值
    1.0
}

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
    let scale_factor = get_scale_factor(&screen);
    
    // 根据缩放比例调整坐标和尺寸
    let scaled_x = (x as f64 * scale_factor) as i32;
    let scaled_y = (y as f64 * scale_factor) as i32;
    let scaled_width = (width as f64 * scale_factor) as u32;
    let scaled_height = (height as f64 * scale_factor) as u32;

    let image = screen.capture_area(scaled_x, scaled_y, scaled_width, scaled_height).unwrap();
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
