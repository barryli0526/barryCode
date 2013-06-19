/**
 * config
 */

var path = require('path');

exports.config = {
    debug: true,
    name: 'dida',
    description: 'dida is a light blog',
    version: '0.0.1',


    host: '',
    site_static_host: '', // 静态文件存储域名

    upload_dir: 'public/user_data/images',
    image_maxAge: 3600000 *24 * 30,

    db: 'mongodb://127.0.0.1/microbloge',
    session_secret: 'dida',
    auth_cookie_name: 'dida',
    port: 3000,

    // 话题列表显示的话题数量
    list_post_count: 10,
    // 最大发表长度
    max_content_length : 140,
    // 用户名最小长度
    name_min_length : 5,

    //mail SMTP
    mail_opts:{
        host: 'smtp.126.com',
        port: 25,
        auth:{
            user: 'club@126.com',
            pass: 'club'
        }
    }

};
