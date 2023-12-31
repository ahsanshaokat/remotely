const { User, Person, Profile, ProfileSkill } = require('../models');
const { CustomException } = require('../utils');

const deleteUser = async (request, response) => {
    const { _id } = request.params;

    try {
        const user = await User.findOne({ _id });

        if (request.userID === user._id.toString()) {
            await User.deleteOne({ _id });
            return response.send({
                error: false,
                message: 'Account successfully deleted!'
            });
        }

        throw CustomException('Invalid request!. Cannot delete other user accounts.', 403);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

const updatePerson = async (request, response) => {
    const { _id } = request.params;
    const { isLocked, isPrivate, profileUrl, profileQualifiesForVanityUrl, video,
        groups, tests, competencies, assignments, clientRelationship, otherExperiences,
        assignmentsInProgress, assignmentsSelected, employmentHistory, isCredlyFeatureEnabled,
        title,
        description,
        location,
        portrait,
        visibility,
        isDisabled,
        affiliated,
        isLooking,
        isLookingWeek,
        exposeFullName,
        confidentialityBound,
        isConsoleViewable,
        agencyRef,
        idVerified,
        exposeBillings,
        phoneVerified,
        state,
        hideAgencyEarnings,
        contractorTier,
        exclusiveAgencyContractor,
        hideJss,
        idBadgeStatus,
        contractToHire,
        agencyUid,
        firstName
    } = request.body;

    try {
        const person = await Person.findOneAndUpdate({ _id }, {
            $set: {
                isLocked, isPrivate, profileUrl, profileQualifiesForVanityUrl, video,
                groups, tests, competencies, assignments, clientRelationship, otherExperiences,
                assignmentsInProgress, assignmentsSelected, employmentHistory, isCredlyFeatureEnabled,
            }
        }, { new: true });

        const profile = await Profile.findOneAndUpdate({ _id: person.profileID }, {
            $set: {
                title,
                description,
                location,
                portrait,
                visibility,
                isDisabled,
                affiliated,
                isLooking,
                isLookingWeek,
                exposeFullName,
                confidentialityBound,
                isConsoleViewable,
                agencyRef,
                idVerified,
                exposeBillings,
                phoneVerified,
                state,
                hideAgencyEarnings,
                contractorTier,
                exclusiveAgencyContractor,
                hideJss,
                idBadgeStatus,
                contractToHire,
                agencyUid,
                firstName
            }
        }, { new: true });

        const personProfile = await User.findOne({ personID: _id }, "username email image isSeller phone description").populate({
            path: 'personID',
            populate: {
                path: 'profileID', 
                model: 'Profile',
            }
        });
        return response.status(201).send(personProfile);
    }
    catch ({ message }) {
        return response.status(500).send({
            error: true,
            message: message
        });
    }
}


const getPerson = async (request, response) => {
    const { _id } = request.params;

    try {
        const person = await User.findOne({ personID: _id }, "username email image isSeller phone description").populate({
            path: 'personID',
            populate: {
                path: 'profileID', 
                model: 'Profile',
                populate: {
                    path: 'skills',
                    model: 'profile-skill'
                }
            }
        });

        let fullProfile = person.toJSON();
        console.log(fullProfile.personID.profileID._id.toString())
        fullProfile["skills"] = await ProfileSkill.find({profileID: "659129386e306933a071c9a6"}).exec();//.populate('skillID', 'prettyName')
        if (!person) {
            throw CustomException('Person not found!', 404);
        }
        return response.send(fullProfile["skills"]);
    }
    catch ({ message, status = 500 }) {
        return response.status(status).send({
            error: true,
            message
        })
    }
}

module.exports = {
    deleteUser,
    updatePerson,
    getPerson,
}