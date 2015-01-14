class WebhooksController < ApplicationController
  def create
    webhook_notification = Braintree::WebhookNotification.parse(
      request.params["bt_signature"],
      request.params["bt_payload"]
    )
    puts "[Webhook Received #{webhook_notification.timestamp}] Kind: #{webhook_notification.kind} | Subscription: #{webhook_notification.subscription.id}"
    return 200
  end

  def verify
    render :text => Braintree::WebhookNotification.verify(params[:bt_challenge])
  end
end
