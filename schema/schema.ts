const graphql = require('graphql');
const MessageDetails = require('../models/MessageDetails');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLSchema, GraphQLNonNull } = graphql;

const MessageType = new GraphQLObjectType({
    name: 'MessageDetails',
    fields: ( ) => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
        mobileNumber: { type: GraphQLString },
        message: { type: GraphQLString },
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        AllMessages: {
            type: new GraphQLList(MessageType),
            resolve(){
                return MessageDetails.find()
            }
        },
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutations',
    fields: {
        addMessage: {
            type: MessageType,
            args: {
                firstName:{type: new GraphQLNonNull(GraphQLString)},
                lastName:{type: new GraphQLNonNull(GraphQLString)},
                email: {type: new GraphQLNonNull(GraphQLString)},
                mobileNumber:{type: new GraphQLNonNull(GraphQLString)},
                message: {type: new GraphQLNonNull(GraphQLString)},
            },
            resolve(parent:undefined,args:any){
                let message =new MessageDetails({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email:args.email,
                    mobileNumber:args.mobileNumber,
                    message:args.message,
                })
                return message.save();
            }
        },
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});