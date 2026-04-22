import BaseInfra from "#root/core/base/infra.base.js";
import { PublicUser } from "#root/core/lib/selector/user.selector.js";
import amqp from 'amqplib';

export enum RabbitMqQueues {

    oauthRegisteredNewUser = 'oauthRegisteredNewUser'

}

export default class RabbitMqInfra extends BaseInfra {
    private connection: amqp.ChannelModel | undefined;
    private channel: amqp.Channel | undefined;
    public ready: boolean = false;

    constructor() {
        super();
        this.init();
    }

    async init() {
        this.connection = await amqp.connect('amqp://localhost');

        this.channel = await this.connection.createChannel();
        this.channel.assertQueue(RabbitMqQueues.oauthRegisteredNewUser, {
            durable: true,
        });
        this.ready = true;
    }

    async sendOauthRegistered(user: PublicUser) {
        if (this.ready) {
            this.channel?.sendToQueue(RabbitMqQueues.oauthRegisteredNewUser, Buffer.from(JSON.stringify(user)), {
                persistent: true
            })
        }
    }
}