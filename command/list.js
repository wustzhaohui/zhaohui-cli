/*
 * @Author: zhaohui
 * @Date: 2021-02-22 14:19:20
 * @LastEditTime: 2021-02-22 14:49:27
 * @LastEditors: zhaohui
 * @Description: 
 * @FilePath: /qz-cli/command/list.js
 */
'use strict';
const config = require('../templates');

module.exports = () => {
    console.log(config.tpl);
    process.exit();
};
