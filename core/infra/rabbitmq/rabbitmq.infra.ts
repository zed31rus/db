import BaseInfra from "#root/core/base/infra.base.js";
import { PublicUser } from "#root/core/lib/selector/user.selector.js";
import amqp from 'amqplib';

export enum RabbitMqQueues {

    oauthRegisteredNewUser = 'oauthRegisteredNewUser'

}

export default class RabbitMqInfra extends BaseInfra {
    private static instance: RabbitMqInfra | null = null;
    private initPromise: Promise<void>;

    private connection!: amqp.ChannelModel;
    private oauthChannel!: amqp.Channel;

    private constructor() {
        super();
        this.initPromise = this.init();
    }

    static getInstance() {
        if (!RabbitMqInfra.instance) {
            RabbitMqInfra.instance = new RabbitMqInfra();
        }
        return RabbitMqInfra.instance;
    }

    private async init() {
        this.connection = await amqp.connect('amqp://localhost');
        this.oauthChannel = await this.connection.createChannel();
        await this.oauthChannel.assertQueue(RabbitMqQueues.oauthRegisteredNewUser, {
            durable: true,
        });
    }

    async sendOauthRegistered(user: PublicUser) {
        await this.initPromise;
        this.oauthChannel.sendToQueue(
            RabbitMqQueues.oauthRegisteredNewUser,
            Buffer.from(JSON.stringify(user)),
            { persistent: true }
        );
    }
}