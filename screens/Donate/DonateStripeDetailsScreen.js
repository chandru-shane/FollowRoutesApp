import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';



const DonateStripeDetailsScreen = (props) => {

  const amount = props.navigation.getParam('amount');
  const recipient = props.navigation.getParam('recipient')

    // TODO: Think about this funciton 
  const onLoadStart = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;

  };

  // Render
  function onMessage(data) {
    // alert(data.nativeEvent.data);
    console.log(data.nativeEvent.data);
    const parsedData = JSON.parse(data.nativeEvent.data)
    const stripeToken = parsedData;
    console.log(stripeToken, '==================____________==============+++++++++++', 'code', stripeToken.length);
    props.navigation.navigate({ routeName: "ConfirmDonation", params: { stripeToken: stripeToken, amount: amount, recipient:recipient, currency:'inr' } });
  }

  return (
    <SafeAreaView style={styles.flexContainer}>
      <WebView
        onMessage={onMessage}
        source={{
          html: `
      <html>
      <head>
        <title>Donate</title>
        <script src="https://js.stripe.com/v3/"></script>
        <style type="text/css">

      .StripeElement {
        background-color: white;
        height: 40px;
        padding: 10px 12px;
        border-radius: 4px;
        border: 1px solid transparent;
        box-shadow: 0 1px 3px 0 #e6ebf1;
        -webkit-transition: box-shadow 150ms ease;
        transition: box-shadow 150ms ease;
      }

      .StripeElement--focus {
        box-shadow: 0 1px 3px 0 #cfd7df;
      }

      .StripeElement--invalid {
        border-color: #fa755a;
      }

      .StripeElement--webkit-autofill {
        background-color: #fefde5 !important;
      }

        </style>    
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      </head>
      <body>
        <div class="container" style="flex:1;">
        <form action="/charge" method="post" id="payment-form">
            <div class="form">
              <label for="card-element">
                <h2>Donate</h2>
                <h3>Enter the Details</h3>
              </label>

              
                <div class="card" style="width: 30rem;">
                    <div id="card-element">
                      <!-- a Stripe Element will be inserted here. -->
                    </div>
                    </div>
              </div>

              <!-- Used to display form errors -->
              <div id="card-errors" role="alert"></div>
            

            <div class="container">
              <button class="btn btn-success" style="margin: 10; align-items: center; justify-content: center; position: absolute; width: 15%;">
              Donate</button>
            </div>
          </form>    
          <!-- <textarea style="width:400px; height:200px;" id="stripeToken" placeholder="Stripe token will print here."></textarea> -->
        </div>

          <script type="text/javascript">
           // Create a Stripe client
          var stripe = Stripe('pk_test_51IVuR9F26FwZeEt2tJ9ENWZ3oe7jrcHLfeCUVy4VphmOKzcUBugZ315F1ezPLNTlkqkmRtAPEpA4kz5PMmBwqOZm001zQA5Kaj');

          // Create an instance of Elements
          var elements = stripe.elements();

          // Custom styling can be passed to options when creating an Element.
          // (Note that this demo uses a wider set of styles than the guide below.)
          var style = {
            base: {
              color: '#32325d',
              lineHeight: '18px',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#aab7c4'
              }
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a'
            }
          };

          // Create an instance of the card Element
          var card = elements.create('card', {style: style});

          // Add an instance of the card Element into the card-element <div>
          card.mount('#card-element');

          // Handle real-time validation errors from the card Element.
          card.addEventListener('change', function(event) {
            var displayError = document.getElementById('card-errors');
            if (event.error) {
              displayError.textContent = event.error.message;
            } else {
              displayError.textContent = '';
            }
          });

          // Handle form submission
          var form = document.getElementById('payment-form');
          form.addEventListener('submit', function(event) {
            event.preventDefault();
            // alert(...card);
            stripe.createToken(card).then(function(result) {
              if (result.error) {
                // Inform the user if there was an error
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
              } else {
                // Send the token to your server
                console.log(result);
                // document.getElementById('stripeToken').value=result.token.id;
                window.ReactNativeWebView.postMessage(JSON.stringify(result.token.id))
              }
            });
          });

        </script>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
      </body>
    </html>` }}
        onLoadStart={onLoadStart}
      />
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: "center",
  },
  flexContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    marginTop: 10,
    justifyContent: 'center',
    // alignItems:'center',
  },
});
export default DonateStripeDetailsScreen;