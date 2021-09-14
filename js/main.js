$(document).ready(function () {
  const $deleteBtn = $(".basket__item-delete");
  const $addItem = $(".basket__add-item");
  const $nextBtn = $(".basket__button-next");
  const $mainBasket = $(".basket__main");
  const $registration = $(".basket__registration");
  const $labelDelivery = $(".basket__form-label.delivery");
  const $labelPayment = $(".basket__form-label.payment");
  const $submitBtn = $(".basket__button-submit");
  const $valueBtn = $(".basket__item-value");
  const $allSummPrice = $(".basket__value-summ");

  $deleteBtn.click(function () {
    $(this).parents(".basket__item").fadeOut(300);
    setTimeout(() => {
      $(this).parents(".basket__item").remove();
      if ($(".basket__item").length === 0) {
        $addItem.show();
        $nextBtn.prop("disabled", true);
      }
    }, 310);
  });

  $nextBtn.click(function () {
    $mainBasket.hide();
    $registration.show();
  });

  $labelDelivery.click(function () {
    if ($(this).attr("for") === "delivery-courier") {
      $("#delivery-pickup").prop("checked", false);
      $(".basket__form-adress").slideDown();
      $(".basket__form-shops").slideUp();
    } else {
      $("#delivery-courier").prop("checked", false);
      $(".basket__form-adress").slideUp();
      $(".basket__form-shops").slideDown();
    }
  });

  $labelPayment.click(function () {
    if ($(this).attr("for") === "payment-cash") {
      $("#payment-card").prop("checked", false);
    } else {
      $("#payment-cash").prop("checked", false);
    }
  });

  $submitBtn.click(function (e) {
    e.preventDefault();
    $registration.hide();
    $(".basket__done").show();
  });

  $valueBtn.click(function () {
    let el = $(this).siblings(".basket__item-value-num");

    if ($(this).attr("data-value") === "plus") {
      el.text((i, val) => +val + 1);
      summPrice(el);
    } else {
      if (el.text() > "1") {
        $(this)
          .siblings(".basket__item-value-num")
          .text((i, val) => +val - 1);
      }
    }
  });

  function triplets(str) {
    return str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1\u202f");
  }

  function price(e) {
    let num = 0;
    $("[data-item-price]").each(function (i, elem) {
      let res;
      num += Number.parseInt($(elem).attr("data-item-price"));
      res = triplets(num);
      $allSummPrice.text(res);
      console.log($allSummPrice.text());
    });
  }
  price();

  function summPrice(val) {
    let priceItem = val.parents(".basket__item-descr").children(".basket__item-price").children().attr("data-item-price");

    let summ = Number.parseInt(priceItem) * Number.parseInt(val.text());
    $allSummPrice.text(Number.parseInt($allSummPrice.text()) + summ);

    console.log($allSummPrice);
  }
});
