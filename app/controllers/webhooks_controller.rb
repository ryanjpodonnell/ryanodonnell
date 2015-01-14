class WebhooksController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def create
    webhook_notification = Braintree::WebhookNotification.parse(
      request.params["bt_signature"],
      request.params["bt_payload"]
    )
    puts "[Webhook Received #{webhook_notification.timestamp}] Kind: #{webhook_notification.kind} | Subscription: #{webhook_notification.subscription.id}"
    render :nothing => true
  end

  def verify
    render :text => Braintree::WebhookNotification.verify(params[:bt_challenge])
  end
end
