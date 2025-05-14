"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronRight, Database, MessageSquare, Users, Calendar, Clock } from "lucide-react"
import { useState, useEffect } from "react"

// タイプライターエフェクトコンポーネント
function TypewriterEffect() {
  const phrases = [
    "次のイベントは明日開催！",
    "新しい仲間と出会おう！",
    "スキルアップのチャンス！",
    "大学生活をもっと充実させよう！",
  ]
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [typingSpeed, setTypingSpeed] = useState(150)

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex]

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === currentPhrase) {
        // 完全に表示されたら、少し待ってから削除を開始
        setTimeout(() => setIsDeleting(true), 1000)
        return
      } else if (isDeleting && currentText === "") {
        // 完全に削除されたら、次のフレーズへ
        setIsDeleting(false)
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length)
        return
      }

      // タイピング速度の調整
      const speed = isDeleting ? 50 : 150
      setTypingSpeed(speed)

      // テキストの更新
      setCurrentText((prev) => {
        if (isDeleting) {
          return prev.substring(0, prev.length - 1)
        } else {
          return currentPhrase.substring(0, prev.length + 1)
        }
      })
    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [currentText, currentPhraseIndex, isDeleting, phrases, typingSpeed])

  return (
    <div className="h-6 min-w-[280px]">
      <span className="text-sm md:text-base font-medium">{currentText}</span>
      <span className="inline-block w-1 h-5 ml-1 bg-white animate-blink"></span>
    </div>
  )
}

// 次のイベントカウントダウンコンポーネント
function NextEventCountdown() {
  // 次のイベント日時（例：1週間後）
  const eventDate = new Date()
  eventDate.setDate(eventDate.getDate() + 7)

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = eventDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [eventDate])

  return (
    <div className="flex items-center gap-1 text-xs md:text-sm bg-white/10 rounded-full px-3 py-1">
      <Calendar className="h-4 w-4 mr-1" />
      <span>次のイベントまで:</span>
      <div className="flex items-center gap-1">
        <span className="bg-white/20 rounded px-1 py-0.5 font-mono">{timeLeft.days}</span>日
        <span className="bg-white/20 rounded px-1 py-0.5 font-mono">{timeLeft.hours}</span>時間
        <span className="bg-white/20 rounded px-1 py-0.5 font-mono">{timeLeft.minutes}</span>分
      </div>
    </div>
  )
}

// アニメーション背景コンポーネント
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10"
          style={{
            width: `${Math.random() * 100 + 50}px`,
            height: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            opacity: Math.random() * 0.5,
            transform: `scale(${Math.random() * 0.5 + 0.5})`,
          }}
        />
      ))}
    </div>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Image
              src="/california-golden-poppies.png"
              alt="ちょい足しアカデミア"
              width={40}
              height={40}
              className="rounded-md"
            />
            <span className="text-xl font-bold">ちょい足しアカデミア</span>
          </div>
          <nav className="flex items-center gap-6">
            <Link
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm font-medium hover:text-primary"
            >
              <Database className="h-4 w-4" />
              Database
            </Link>
            <Link href="#contact" className="flex items-center gap-1 text-sm font-medium hover:text-primary">
              <MessageSquare className="h-4 w-4" />
              Contact
            </Link>
          </nav>
        </div>
      </header>

      {/* インタラクティブバナーセクション */}
      <section className="relative w-full bg-gradient-to-r from-[#015958] via-[#0CABA8] to-[#0FC2C0] py-4 overflow-hidden">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 animate-pulse" />
              <TypewriterEffect />
            </div>
            <div className="flex items-center gap-4">
              <NextEventCountdown />
              <Button variant="outline" className="bg-white/10 text-white border-white/20 hover:bg-white/20">
                <Link href="#information" className="flex items-center gap-2">
                  詳細を見る
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <AnimatedBackground />
      </section>

      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-[#0FC2C0]/10 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-[#015958]">
                    ちょいアカとは？
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    ちょい足しアカデミアは、大学生のための情報共有と相互支援のプラットフォームです。いつでも、どこでも、必要な情報にアクセスし、仲間とつながることができます。
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-[#0CABA8] hover:bg-[#015958]">
                    <Link href="#information" className="flex items-center gap-2">
                      詳しく見る
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="outline" className="border-[#0CABA8] text-[#0CABA8]">
                    <Link href="#contact" className="flex items-center gap-2">
                      お問い合わせ
                      <MessageSquare className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?key=idl5y"
                  alt="大学生の協力"
                  width={500}
                  height={400}
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 情報提供セクション */}
        <section id="information" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#0FC2C0]/20 px-3 py-1 text-sm text-[#015958]">情報提供</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#015958]">
                  いつ・どこで・どんな会が開かれるか
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  検索機能付きデータベースで、あなたに合った情報をすぐに見つけることができます。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12">
              <div className="relative h-[400px] w-full overflow-hidden rounded-xl border bg-background">
                <Image
                  src="/placeholder.svg?key=2rvp5"
                  alt="データベーススクリーンショット"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent p-6">
                  <Button className="bg-[#0CABA8] hover:bg-[#015958]">
                    <Link
                      href="https://notion.so"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      データベースを見る
                      <Database className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                <Card className="border-[#0FC2C0]/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0FC2C0]/20">
                        <span className="text-xl font-bold text-[#015958]">いつ</span>
                      </div>
                      <h3 className="text-xl font-bold">開催日時</h3>
                      <p className="text-sm text-muted-foreground">
                        イベントの日程をカレンダー形式で確認できます。自分のスケジュールに合わせて参加できます。
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#0FC2C0]/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0FC2C0]/20">
                        <span className="text-xl font-bold text-[#015958]">どこで</span>
                      </div>
                      <h3 className="text-xl font-bold">開催場所</h3>
                      <p className="text-sm text-muted-foreground">
                        オンライン・オフラインを問わず、アクセスしやすい場所で開催されます。地図情報も確認できます。
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-[#0FC2C0]/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2 text-center">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0FC2C0]/20">
                        <span className="text-xl font-bold text-[#015958]">どんな</span>
                      </div>
                      <h3 className="text-xl font-bold">イベント内容</h3>
                      <p className="text-sm text-muted-foreground">
                        勉強会、交流会、ワークショップなど、多様なイベントが開催されています。詳細な内容を事前に確認できます。
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 経験共有セクション */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#0FC2C0]/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#0FC2C0]/20 px-3 py-1 text-sm text-[#015958]">経験共有</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#015958]">
                  参加者の声
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  実際に参加した方々の感想やインタビューをご紹介します。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "田中さん",
                  role: "大学3年生",
                  comment:
                    "ちょいアカのイベントで知り合った友人と一緒に研究プロジェクトを始めることができました。新しい出会いと学びの場として最高です！",
                  image: "/placeholder.svg?key=4i94q",
                },
                {
                  name: "佐藤さん",
                  role: "大学2年生",
                  comment:
                    "初めて参加したときは緊張しましたが、みんな優しく接してくれて、すぐに打ち解けることができました。専門知識も深まり、視野が広がりました。",
                  image: "/placeholder.svg?key=s1mlb",
                },
                {
                  name: "鈴木さん",
                  role: "大学4年生",
                  comment:
                    "就活に役立つ情報を得られただけでなく、先輩方からの具体的なアドバイスが本当に助かりました。おかげで志望企業から内定をいただけました！",
                  image: "/placeholder.svg?key=5py7i",
                },
                {
                  name: "山田さん",
                  role: "大学1年生",
                  comment:
                    "大学生活の不安が解消されました。同じ悩みを持つ仲間と出会えて、モチベーションが上がりました。これからも参加し続けたいです！",
                  image: "/placeholder.svg?key=x2siq",
                },
                {
                  name: "伊藤さん",
                  role: "大学3年生",
                  comment:
                    "オンラインでも対面でも参加しやすく、忙しい大学生活の中でも無理なく続けられています。毎回新しい発見があって楽しいです。",
                  image: "/placeholder.svg?key=mmnpa",
                },
                {
                  name: "渡辺さん",
                  role: "大学2年生",
                  comment:
                    "専攻が違う学生との交流で、自分には無かった視点や考え方に触れられるのが魅力です。視野が広がりました！",
                  image: "/placeholder.svg?key=s6i0x",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border-[#0FC2C0]/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-4 text-center">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={80}
                        height={80}
                        className="rounded-full"
                      />
                      <div>
                        <h3 className="text-lg font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-[#0CABA8]">{testimonial.role}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.comment}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 相互支援セクション (TBA) */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#0FC2C0]/20 px-3 py-1 text-sm text-[#015958]">相互支援</div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#015958]">
                  Coming Soon
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  感想投稿フォームやコメント機能を使った議論の場を準備中です。
                </p>
                <div className="flex justify-center mt-8">
                  <div className="flex items-center justify-center h-40 w-full max-w-3xl rounded-xl border-2 border-dashed border-[#0CABA8]/50 bg-muted/50">
                    <div className="flex flex-col items-center justify-center space-y-2">
                      <Users className="h-10 w-10 text-[#0CABA8]" />
                      <p className="text-sm font-medium text-muted-foreground">TBA - 準備中です</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* お問い合わせセクション */}
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-[#015958]/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-[#0FC2C0]/20 px-3 py-1 text-sm text-[#015958]">
                  お問い合わせ
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#015958]">
                  ご質問・ご相談はこちら
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed">
                  ちょい足しアカデミアに関するお問い合わせは、以下のフォームからお願いします。
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-3xl gap-6 py-12">
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="name" className="text-sm font-medium leading-none">
                    お名前
                  </label>
                  <input
                    id="name"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="山田 太郎"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="email" className="text-sm font-medium leading-none">
                    メールアドレス
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="example@email.com"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="message" className="text-sm font-medium leading-none">
                    お問い合わせ内容
                  </label>
                  <textarea
                    id="message"
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="ご質問・ご相談内容をご記入ください"
                  />
                </div>
                <Button className="bg-[#0CABA8] hover:bg-[#015958]">送信する</Button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
          <div className="flex items-center gap-2">
            <Image
              src="/california-golden-poppies.png"
              alt="ちょい足しアカデミア"
              width={30}
              height={30}
              className="rounded-md"
            />
            <span className="text-sm font-bold">ちょい足しアカデミア</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ちょい足しアカデミア. All rights reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary">
              お問い合わせ
            </Link>
            <Link
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              Database
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
