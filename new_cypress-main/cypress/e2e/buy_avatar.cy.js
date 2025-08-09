import * as Auth from "../helpers/pokemonAuth.json"
import test from "../helpers/test_card.json"
import * as Login from "../locators/LoginPage.json"
import * as Payment from "../locators/paymentPage.json"


describe('Покупка аватара для тренера', function () {

   it('e2e тестирование на покупку нового аватара', function () {
       //Авторизация
        cy.visit('https://pokemonbattle.ru/'); // Зайти на сайт
        cy.get(Login.email_input).type(Auth.USER_LOGIN); //Ввести верный логин
        cy.get(Login.password_input).type(Auth.USER_PASSWORD); // Ввести верный пароль
        cy.get(Login.login_button).click(); // Нажать кнопку войти
        cy.get('.style_1_heading_38_400_pokemon_classic', { timeout: 10000 }).should('be.visible'); // Убедиться, что мы на странице "Покемоны" и она видна пользователю
       
        //Покупка Аватара
        cy.get('.header_card_trainer').click(); // Нажать кнопку карточка тренера
        cy.get('.attr_id_trainer', { timeout: 10000 }).should('be.visible'); // Убедиться, что мы на странице тренера и она видна пользователю
        cy.get('[data-qa="shop"]').click(); // Нажать кнопку "Смена аватара"
        cy.get('.shop__item.available > button').first().click(); // Выбрать первый доступный к покупке аватар и нажать "Купить"
        
        //Оплата
        cy.get('.payment_header_content_title_h2', { timeout: 10000 }).should('contain', 'Пикачунькофф'); // Убедиться, что мы на странице покупки
        cy.get(Payment.number).type(test.number); // Ввести  номер карты
        cy.get(Payment.date).type(test.date); // Ввести  срок действия карты
        cy.get(Payment.cvv).type(test.cvv); // Ввести CVV код карты
        cy.get(Payment.name).type(test.name); // Ввести  Имя и Фамилию
        cy.get(Payment.buttonPayment).click(); // Нажать кнопку оплатить
        cy.get(Payment.pushCode, { timeout: 10000 }).should('be.visible').type(test.sms_code); //Ждём поле для SMS и вводим код
        cy.get(Payment.buttonPayment).click(); // Нажать кнопку оплатить
        cy.get('.payment_status_top_title').contains('Покупка прошла успешно').should('be.visible'); // Убедиться, что появилось уведомление об успешной покупке и оно видно для пользователя


   });

});