const securityQuestions = [
  { id: 0, question: "What was the name of your first pet?" },
  { id: 1, question: "What is the name of the street you grew up on?" },
  { id: 2, question: "What was your childhood nickname?" },
  { id: 3, question: "In what city did you meet your spouse/partner?" },
  { id: 4, question: "What is your favorite family vacation?" },
  { id: 5, question: "What was the name of your elementary school?" },
  { id: 6, question: "What was your dream job as a child?" },
  { id: 7, question: "What is the name of your favorite teacher?" },
  { id: 8, question: "What was the make and model of your first car?" },
  { id: 9, question: "What is the name of your favorite book?" },
  {
    id: 10,
    question: "What was the name of the hospital where you were born?",
  },
  { id: 11, question: "What is your favorite movie from childhood?" },
  { id: 12, question: "What is your mother's maiden name?" },
  {
    id: 13,
    question: "What is the name of your favorite sports team?",
  },
  { id: 14, question: "What was your first concert?" },
  { id: 15, question: "What was your favorite subject in school?" },
  { id: 16, question: "What is your favorite holiday tradition?" },
  {
    id: 17,
    question: "What is the name of your best friend in high school?",
  },
  { id: 18, question: "What was your first job?" },
  {
    id: 19,
    question: "What was the name of your first stuffed animal?",
  },
  { id: 20, question: "What is your favorite family recipe?" },
  {
    id: 21,
    question: "What was your favorite game to play as a child?",
  },
  {
    id: 22,
    question: "What is the name of your favorite childhood friend?",
  },
  { id: 23, question: "What is your favorite comic book character?" },
  { id: 24, question: "What was the best gift you ever received?" },
  {
    id: 25,
    question: "What is the name of the first school you attended?",
  },
  { id: 26, question: "What is your favorite ice cream flavor?" },
  {
    id: 27,
    question: "What is the name of your favorite childhood toy?",
  },
  { id: 28, question: "What is the name of your favorite restaurant?" },
  { id: 29, question: "What is your favorite sport to play or watch?" },
  { id: 30, question: "What is the name of your favorite album?" },
  { id: 31, question: "What is your favorite family memory?" },
  {
    id: 32,
    question: "What is the name of the city where your parents met?",
  },
  { id: 33, question: "What is your favorite childhood memory?" },
  { id: 34, question: "What is the name of your favorite park?" },
  {
    id: 35,
    question: "What is your favorite childhood television show?",
  },
  {
    id: 36,
    question: "What is the name of your favorite teacher in high school?",
  },
  { id: 37, question: "What is your favorite quote or saying?" },
  { id: 38, question: "What is the name of your first boss?" },
  {
    id: 39,
    question: "What is the name of the place where you got engaged?",
  },
  { id: 40, question: "What was your favorite subject in college?" },
  { id: 41, question: "What was the name of your first roommate?" },
  { id: 42, question: "What is your favorite way to spend a weekend?" },
  {
    id: 43,
    question: "What is the name of your favorite childhood book?",
  },
  { id: 44, question: "What is your favorite way to relax?" },
  { id: 45, question: "What is your favorite family outing?" },
  {
    id: 46,
    question: "What is the name of the first movie you saw in theaters?",
  },
  { id: 47, question: "What is your dream vacation destination?" },
  {
    id: 48,
    question: "What is the name of the first concert you attended?",
  },
  {
    id: 49,
    question: "What is your favorite way to celebrate your birthday?",
  },
  { id: 50, question: "What is your favorite childhood snack?" },
  { id: 51, question: "What is the name of your first teacher?" },
  { id: 52, question: "What was your favorite family pet?" },
  {
    id: 53,
    question: "What was your favorite thing to do during summer vacations?",
  },
  { id: 54, question: "What is your favorite childhood sport?" },
  { id: 55, question: "What is the name of your favorite holiday?" },
  { id: 56, question: "What was your favorite childhood game?" },
  {
    id: 57,
    question: "What was the name of the first friend you made in school?",
  },
  {
    id: 58,
    question: "What was your first car's license plate number?",
  },
  { id: 59, question: "What was your favorite birthday party theme?" },
  { id: 60, question: "What is the name of your favorite superhero?" },
  { id: 61, question: "What was your favorite family vacation spot?" },
  {
    id: 62,
    question: "What is your favorite thing about your hometown?",
  },
  {
    id: 63,
    question: "What is the name of your favorite childhood movie?",
  },
  { id: 64, question: "What is your favorite way to stay active?" },
  { id: 65, question: "What was your favorite class in school?" },
  { id: 66, question: "What is your favorite childhood song?" },
  {
    id: 67,
    question: "What is the name of your favorite childhood neighbor?",
  },
  {
    id: 68,
    question: "What is your favorite childhood outdoor activity?",
  },
  {
    id: 69,
    question: "What is your favorite way to spend time with family?",
  },
  { id: 70, question: "What is the name of your first pet's breed?" },
  { id: 71, question: "What is your favorite thing about your job?" },
  { id: 72, question: "What was your favorite toy as a child?" },
  { id: 73, question: "What is your favorite memory from school?" },
  {
    id: 74,
    question: "What is the name of your best friend in elementary school?",
  },
  {
    id: 75,
    question: "What was your favorite subject in elementary school?",
  },
  { id: 76, question: "What is your favorite family tradition?" },
  {
    id: 77,
    question: "What is the name of the first movie you watched on your own?",
  },
  { id: 78, question: "What is your favorite type of cuisine?" },
  {
    id: 79,
    question: "What is the name of your favorite childhood activity?",
  },
  {
    id: 80,
    question: "What was the name of your favorite childhood book character?",
  },
  {
    id: 81,
    question: "What is your favorite way to express creativity?",
  },
  {
    id: 82,
    question: "What is the name of your favorite vacation spot?",
  },
  {
    id: 83,
    question: "What was your favorite thing about summer camp?",
  },
  { id: 84, question: "What is the name of your first pet's name?" },
  {
    id: 85,
    question: "What is your favorite thing about your best friend?",
  },
  {
    id: 86,
    question: "What is the name of your favorite childhood show?",
  },
  {
    id: 87,
    question: "What is your favorite family tradition during the holidays?",
  },
  {
    id: 88,
    question: "What is your favorite way to celebrate milestones?",
  },
  {
    id: 89,
    question: "What was your favorite thing to do with your grandparents?",
  },
  {
    id: 90,
    question: "What is the name of your favorite childhood dessert?",
  },
  {
    id: 91,
    question: "What is your favorite memory with your family?",
  },
  {
    id: 92,
    question: "What is the name of your favorite childhood game?",
  },
  {
    id: 93,
    question: "What is your favorite way to give back to the community?",
  },
  {
    id: 94,
    question: "What is the name of your favorite childhood character?",
  },
  {
    id: 95,
    question: "What is your favorite way to learn new things?",
  },
  {
    id: 96,
    question: "What was your favorite thing to do after school?",
  },
  {
    id: 97,
    question: "What is the name of your favorite family member?",
  },
  {
    id: 98,
    question: "What is your favorite childhood activity with friends?",
  },
  {
    id: 99,
    question: "What is your favorite quote from a book or movie?",
  },

  {
    id: 100,
    question: "What is the name of your favorite childhood story?",
  },
  {
    id: 101,
    question: "What is your favorite way to celebrate achievements?",
  },
  {
    id: 102,
    question: "What is the name of your childhood best friend?",
  },
  { id: 103, question: "What was your first crush's name?" },
  { id: 104, question: "What was your favorite childhood sport?" },
  { id: 105, question: "What was the name of your first stuffed toy?" },
  { id: 106, question: "What is your favorite family game?" },
  {
    id: 107,
    question: "What was your favorite class in elementary school?",
  },
  { id: 108, question: "What was your favorite holiday as a child?" },
  { id: 109, question: "What was your favorite family holiday?" },
  {
    id: 110,
    question: "What is the name of the first person you kissed?",
  },
  {
    id: 111,
    question: "What is your favorite way to spend a rainy day?",
  },
  { id: 112, question: "What was your favorite candy as a child?" },
  {
    id: 113,
    question: "What was the name of your first girlfriend/boyfriend?",
  },
  { id: 114, question: "What is your favorite outdoor activity?" },
  { id: 115, question: "What is your favorite dessert?" },
  { id: 116, question: "What is your favorite family event?" },
  {
    id: 117,
    question: "What is your favorite childhood memory with a pet?",
  },
  { id: 118, question: "What is your favorite way to enjoy nature?" },
  { id: 119, question: "What was your favorite toy growing up?" },
  {
    id: 120,
    question: "What is the name of your favorite aunt or uncle?",
  },
  {
    id: 121,
    question: "What is your favorite childhood memory with a sibling?",
  },
  {
    id: 122,
    question: "What was your favorite thing to do during winter?",
  },
  {
    id: 123,
    question: "What is your favorite thing to do on a weekend?",
  },
  { id: 124, question: "What is your favorite holiday memory?" },
  {
    id: 125,
    question: "What was your favorite board game as a child?",
  },
  { id: 126, question: "What is the name of your childhood hero?" },
  { id: 127, question: "What is your favorite childhood TV show?" },
  {
    id: 128,
    question: "What was your favorite subject in high school?",
  },
  {
    id: 129,
    question: "What is your favorite thing about your family?",
  },
  { id: 130, question: "What was the name of your first crush?" },
  { id: 131, question: "What is your favorite way to stay fit?" },
  { id: 132, question: "What was your favorite family vacation?" },
  {
    id: 133,
    question: "What was your favorite thing to do with friends?",
  },
  { id: 134, question: "What was your favorite family recipe?" },
  {
    id: 135,
    question: "What is your favorite way to celebrate special occasions?",
  },
  {
    id: 136,
    question: "What is your favorite family holiday tradition?",
  },
  { id: 137, question: "What is your favorite childhood craft?" },
  { id: 138, question: "What was your favorite summer activity?" },
  {
    id: 139,
    question: "What is the name of your favorite childhood movie character?",
  },
  {
    id: 140,
    question: "What is your favorite way to connect with friends?",
  },
  { id: 141, question: "What was your favorite family event?" },
  { id: 142, question: "What is your favorite childhood book?" },
  { id: 143, question: "What was your favorite family outing?" },
  { id: 144, question: "What is your favorite type of exercise?" },
  {
    id: 145,
    question: "What was your favorite thing to do during summer?",
  },
  { id: 146, question: "What is your favorite family gathering?" },
  {
    id: 147,
    question: "What is your favorite way to spend time outdoors?",
  },
  { id: 148, question: "What is your favorite childhood show?" },
  { id: 149, question: "What was your favorite class in college?" },
  { id: 150, question: "What was your favorite family trip?" },
  {
    id: 151,
    question: "What is your favorite childhood memory with friends?",
  },
  {
    id: 152,
    question: "What is your favorite way to enjoy your hobbies?",
  },
  {
    id: 153,
    question: "What was your favorite thing to do with cousins?",
  },
  { id: 154, question: "What is your favorite family pet?" },
  { id: 155, question: "What was your favorite childhood adventure?" },
  {
    id: 156,
    question: "What is your favorite thing about your childhood home?",
  },
  {
    id: 157,
    question: "What is your favorite way to spend a holiday?",
  },
  {
    id: 158,
    question: "What was your favorite thing to do in your neighborhood?",
  },
  {
    id: 159,
    question: "What is your favorite way to celebrate with friends?",
  },
  { id: 160, question: "What is your favorite way to volunteer?" },
  { id: 161, question: "What was your favorite family tradition?" },
  {
    id: 162,
    question: "What was your favorite thing to do in the summer?",
  },
  { id: 163, question: "What is your favorite holiday treat?" },
  {
    id: 164,
    question: "What is your favorite way to celebrate a birthday?",
  },
  { id: 165, question: "What was your favorite family gathering?" },
  { id: 166, question: "What is your favorite childhood dessert?" },
  {
    id: 167,
    question: "What is your favorite childhood memory with your family?",
  },
  {
    id: 168,
    question: "What was your favorite thing to do on weekends?",
  },
  {
    id: 169,
    question: "What is your favorite way to celebrate holidays?",
  },
  {
    id: 170,
    question: "What is your favorite way to connect with family?",
  },
  { id: 171, question: "What was your favorite childhood snack?" },
  { id: 172, question: "What is your favorite memory from childhood?" },
  {
    id: 173,
    question: "What is your favorite way to spend time with friends?",
  },
  {
    id: 174,
    question: "What was your favorite thing to do as a child?",
  },
];

module.exports = {
  securityQuestions,
};
