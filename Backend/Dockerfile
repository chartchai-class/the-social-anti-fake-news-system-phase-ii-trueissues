# ===== Stage 1: Build JAR =====
FROM maven:3.9.6-eclipse-temurin-17 AS builder
WORKDIR /app

# คัดลอกไฟล์ทั้งหมดเข้ามาใน container
COPY . .

# สร้าง jar โดยไม่รัน test
RUN mvn clean package -DskipTests

# ===== Stage 2: Run Application =====
FROM openjdk:21-jdk
WORKDIR /app

# คัดลอก jar จาก builder stage เข้ามา
COPY --from=builder /app/target/trustissues-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
