use std::fs;

use tauri::api::path::home_dir;

pub fn create_dir() {
    let home_path = home_dir().unwrap();

    let path = format!("{}/.teacherAI", home_path.display());
    println!("{}", path);
    // 如果文件夹不存在则创建，存在则不做任何操作
    if std::path::Path::new(&path).exists() {
        println!("文件夹已存在");
        return;
    }
    let result = fs::create_dir(std::path::PathBuf::from(path));
    match result {
        Ok(()) => println!("文件夹创建成功"),
        Err(error) => println!("文件夹创建失败: {}", error),
    }
}
