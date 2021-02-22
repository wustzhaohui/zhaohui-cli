/*
 * @Author: zhaohui
 * @Date: 2021-02-22 14:23:50
 * @LastEditTime: 2021-02-22 14:47:59
 * @LastEditors: zhaohui
 * @Description: 
 * @FilePath: /qz-cli/command/delete.js
 */
'use strict'
const co = require('co')
const prompt = require('co-prompt')
const config = require('../templates')
const chalk = require('chalk')

module.exports = () => {
    co(function *(params) {
        // 接收用户输入的参数
        let tplName = yield prompt('Template name: ')

        // 删除对应的模版
        if (config.tpl[tplName]) {
            config.tpl[tplName] = undefined
        } else {
            console.log(chalk.red('Template does not exist!'));
            process.exit()
        }

        // 把模版文件写入template.json
        fs.writeFile(__dirname + '/.../templates.json', JSON.stringify(config), 'utf-8', (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log(chalk.green('Template has deleted\n'));
                console.log(chalk.grey('The last template list is:\n'));
                console.log(config);
                console.log('\n');
                process.exit();
            }
        })
    })
}