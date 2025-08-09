import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"
describe('Проверка авторизации', function () {

     beforeEach('Начало теста', function () {
         cy.visit('/'); // Зайти на сайт
         cy.get('#forgotEmailButton').should('have.css', 'color', 'rgb(0, 85, 152)');// Проверяю цвет кнопки восс. пароля
           });

    afterEach('Конец теста', function () {
         cy.get('#exitMessageButton > .exitIcon').should('be.visible'); // Есть крестик и он виден пользователю
        });

   it('Верный пароль и верный логин', function () {
        cy.get('#mail').type(data.login); //Ввести верный логин
        cy.get('#pass').type (data.password); //Ввести верный пароль
        cy.get('#loginButton').click(); // Нажать кнопку войти
        
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// Проверка, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible');  

    })
    
    it('Восстановление пароля', function () {    
        cy.get('#forgotEmailButton').click(); // Нажать кнопку "Забыли пароль?"
        cy.get('#mailForgot').type(data.login); // Ввести верный логин
        cy.get('#restoreEmailButton').click(); // Нажать кнопку "Отправить код"

        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');// Проверка, что после ввода логина виден текст
        cy.get('#messageHeader').should('be.visible'); // Проверка что текст виден пользователю 

    })


    it('Не верный пароль и верный логин', function () { 
        cy.get('#mail').type(data.login); //Ввести верный логин
        cy.get('#pass').type ('iLoveqastudio'); //Ввести неверный пароль
        cy.get('#loginButton').click(); // Нажать кнопку войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// Проверка, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible');
        

    })


    it('Верный пароль и  не верный логин', function () {
        cy.get('#mail').type('german@dolniko.ru'); //Ввести не верный логин
        cy.get('#pass').type (data.password); //Ввести верный пароль
        cy.get('#loginButton').click(); // Нажать кнопку войти
        
        cy.get('#messageHeader').contains('Такого логина или пароля нет');// Проверка, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible');
        

    })


    it('Ввести логин без @', function () {
        cy.get('#mail').type('germandolnikov.ru'); //Ввести логин без @
        cy.get('#pass').type (data.password); //Ввести верный пароль
        cy.get('#loginButton').click(); // Нажать кнопку войти
        
        cy.get('#messageHeader').contains('Нужно исправить проблему валидации');// Проверка, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible');
        

    })

    
    it('Ввести логин в регистре', function () {
        cy.get('#mail').type('GerMan@Dolnikov.ru'); //Ввести логин в регистре
        cy.get('#pass').type (data.password); //Ввести верный пароль
        cy.get('#loginButton').click(); // Нажать кнопку войти
        
        cy.get('#messageHeader').contains('Авторизация прошла успешно');// Проверка, что после авторизации виден текст
        cy.get('#messageHeader').should('be.visible');
        

    })
})


