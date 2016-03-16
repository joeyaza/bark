angular
.module('bark',[])
.controller('MainController', MainController);

MainController.$inject = ['$http'];

function MainController($http){
  var self = this;
  self.curr = [];
  self.rates = [];
  self.base = "";
  self.target = "";
  self.amount = "";
  self.choice = "eur";
  self.currencies = ["AUD", "BGN", "BRL", "CAD", "CHF", "CNY", "CZK", "DKK", "GBP", "HKD", "HRK", "HUF", "IDR", "ILS"]
  //self.searchCurr = searchCurr;

  self.searchCurr = function() {
    $http
    .get('http://api.fixer.io/latest?base=' + self.choice)
    .then(function(response){
      self.curr = response.data;
      self.rates = response.data.rates;
    });
  }

  $.getJSON('http://api.fixer.io/latest',function(data){
    if (typeof fx !==  "undefined" && fx.rates){
      fx.rates = data.rates;
      fx.base = data.base;
    }
    else{
      window.fxSetup = {
        rates: data.rates,
        base: data.base
      };
    }
  });

  self.convert = function() {
    var converted = fx.convert(self.amount,{from:self.base,to:self.target});
    converted = converted.toFixed(2);
    $('#answer').html(converted);
  }

  self.searchCurr();
}

