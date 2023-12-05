//GP3/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { LearningPackage } = require('./src/models/models'); // Sequelize 모델
const { sequelize } = require('./src/models/models'); // sequelize 객체를 가져와야 함

const app = express();

// CORS 미들웨어 사용 설정
// 개발 단계에서 모든 도메인의 요청을 허용하거나, 특정 도메인에 대해서만 허용 설정
app.use(cors({
  origin: 'http://localhost:4200' // 프론트엔드 서버의 URL
}));

app.use(bodyParser.json());
// ... 나머지 서버 설정 및 라우트

app.post('/users', async (req, res) => {
  console.log('Received username from frontend:', req.body.username); // 로그 추가
  const t = await sequelize.transaction(); // 트랜잭션 시작

  try {
    const { username } = req.body;
    // 트랜잭션을 사용하여 데이터베이스 작업 수행
    const newUser = await LearningPackage.create({ username }, { transaction: t });

    await t.commit(); // 트랜잭션 커밋
    console.log(`New user added: ${newUser.username}`);
    res.status(201).send(newUser);
  } catch (error) {
    await t.rollback(); // 트랜잭션 롤백
    console.error('Error during transaction', error);
    res.status(400).send(error);
  }
});
// 데이터베이스 동기화 코드 추가
sequelize.sync({ force: false }).then(() => {
  console.log('Database & tables created!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
