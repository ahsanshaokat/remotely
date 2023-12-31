const User = require('./user.model');
const Message = require('./message.model');
const Gig = require('./gig.model');
const Conversation = require('./conversation.model');
const Order = require('./order.model');
const Review = require('./review.model');
const PaymentIntent = require('./payment_intent.model');
const Skill = require('./skill.model');
const Person = require('./person.model');
const Profile = require('./profile.model');
const Education = require('./education.model');
const ProfileSkill = require('./profile_skill.model');


module.exports = {
    User,
    Message,
    Gig,
    Conversation,
    Order,
    Review,
    Person,
    Profile,
    Education,
    ProfileSkill,
    Skill,
    PaymentIntent
}